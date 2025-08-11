import { supabase } from '../lib/supabase';
import { Booking, TimeSlot } from '../types';
import { Database } from '../types/database';

type BookingRow = Database['public']['Tables']['bookings']['Row'];
type TimeSlotRow = Database['public']['Tables']['time_slots']['Row'];

// Transform database row to application type
const transformBooking = (row: BookingRow): Booking => ({
  id: row.id,
  userId: row.user_id,
  facilityId: row.facility_id,
  courtId: row.court_id,
  date: row.booking_date,
  timeSlot: {
    start: row.start_time,
    end: row.end_time,
  },
  status: row.status,
  totalPrice: Number(row.total_price),
  paymentStatus: row.payment_status,
  createdAt: new Date(row.created_at),
});

const transformTimeSlot = (row: TimeSlotRow): TimeSlot => ({
  id: row.id,
  courtId: row.court_id,
  date: row.slot_date,
  startTime: row.start_time,
  endTime: row.end_time,
  isAvailable: row.is_available,
  isBlocked: row.is_blocked,
  reason: row.block_reason || undefined,
});

export const bookingService = {
  // Get user bookings
  async getUserBookings(userId: string): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        facilities(name),
        courts(name)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user bookings:', error);
      return [];
    }

    return data.map(transformBooking);
  },

  // Get facility bookings (for owners)
  async getFacilityBookings(facilityId: string): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        users(full_name, email),
        courts(name)
      `)
      .eq('facility_id', facilityId)
      .order('booking_date', { ascending: true });

    if (error) {
      console.error('Error fetching facility bookings:', error);
      return [];
    }

    return data.map(transformBooking);
  },

  // Get available time slots for a court on a specific date
  async getAvailableTimeSlots(courtId: string, date: string): Promise<TimeSlot[]> {
    const { data, error } = await supabase
      .from('time_slots')
      .select('*')
      .eq('court_id', courtId)
      .eq('slot_date', date)
      .eq('is_available', true)
      .eq('is_blocked', false)
      .order('start_time');

    if (error) {
      console.error('Error fetching time slots:', error);
      return [];
    }

    return data.map(transformTimeSlot);
  },

  // Create a booking
  async createBooking(bookingData: {
    userId: string;
    facilityId: string;
    courtId: string;
    date: string;
    startTime: string;
    endTime: string;
    totalPrice: number;
  }): Promise<Booking | null> {
    // Start a transaction to ensure atomicity
    const { data, error } = await supabase.rpc('create_booking_transaction', {
      p_user_id: bookingData.userId,
      p_facility_id: bookingData.facilityId,
      p_court_id: bookingData.courtId,
      p_booking_date: bookingData.date,
      p_start_time: bookingData.startTime,
      p_end_time: bookingData.endTime,
      p_total_price: bookingData.totalPrice,
    });

    if (error) {
      console.error('Error creating booking:', error);
      return null;
    }

    // Fetch the created booking
    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', data)
      .single();

    if (fetchError) {
      console.error('Error fetching created booking:', fetchError);
      return null;
    }

    return transformBooking(booking);
  },

  // Cancel a booking
  async cancelBooking(bookingId: string): Promise<boolean> {
    const { error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', bookingId);

    if (error) {
      console.error('Error cancelling booking:', error);
      return false;
    }

    return true;
  },

  // Update booking status
  async updateBookingStatus(bookingId: string, status: 'confirmed' | 'cancelled' | 'completed'): Promise<boolean> {
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId);

    if (error) {
      console.error('Error updating booking status:', error);
      return false;
    }

    return true;
  },

  // Update payment status
  async updatePaymentStatus(bookingId: string, paymentStatus: 'pending' | 'paid' | 'refunded'): Promise<boolean> {
    const { error } = await supabase
      .from('bookings')
      .update({ payment_status: paymentStatus })
      .eq('id', bookingId);

    if (error) {
      console.error('Error updating payment status:', error);
      return false;
    }

    return true;
  },
};