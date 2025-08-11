import { supabase } from '../lib/supabase';
import { Facility, Court } from '../types';
import { Database } from '../types/database';

type FacilityRow = Database['public']['Tables']['facilities']['Row'];
type CourtRow = Database['public']['Tables']['courts']['Row'];

// Transform database row to application type
const transformFacility = (row: FacilityRow): Facility => ({
  id: row.id,
  name: row.name,
  description: row.description,
  address: row.address,
  ownerId: row.owner_id,
  sports: row.sports,
  amenities: row.amenities,
  photos: row.photos,
  rating: Number(row.rating),
  reviewCount: row.review_count,
  status: row.status,
  priceRange: {
    min: Number(row.price_min),
    max: Number(row.price_max),
  },
  location: {
    lat: Number(row.latitude),
    lng: Number(row.longitude),
  },
  createdAt: new Date(row.created_at),
});

const transformCourt = (row: CourtRow): Court => ({
  id: row.id,
  facilityId: row.facility_id,
  name: row.name,
  sportType: row.sport_type,
  pricePerHour: Number(row.price_per_hour),
  operatingHours: {
    start: row.operating_hours_start,
    end: row.operating_hours_end,
  },
  isActive: row.is_active,
});

export const facilityService = {
  // Get all approved facilities
  async getApprovedFacilities(): Promise<Facility[]> {
    const { data, error } = await supabase
      .from('facilities')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching facilities:', error);
      return [];
    }

    return data.map(transformFacility);
  },

  // Get facility by ID
  async getFacilityById(id: string): Promise<Facility | null> {
    const { data, error } = await supabase
      .from('facilities')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching facility:', error);
      return null;
    }

    return transformFacility(data);
  },

  // Get facilities by owner
  async getFacilitiesByOwner(ownerId: string): Promise<Facility[]> {
    const { data, error } = await supabase
      .from('facilities')
      .select('*')
      .eq('owner_id', ownerId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching owner facilities:', error);
      return [];
    }

    return data.map(transformFacility);
  },

  // Get courts for a facility
  async getCourtsByFacility(facilityId: string): Promise<Court[]> {
    const { data, error } = await supabase
      .from('courts')
      .select('*')
      .eq('facility_id', facilityId)
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.error('Error fetching courts:', error);
      return [];
    }

    return data.map(transformCourt);
  },

  // Create a new facility
  async createFacility(facilityData: Omit<Facility, 'id' | 'createdAt' | 'rating' | 'reviewCount'>): Promise<Facility | null> {
    const { data, error } = await supabase
      .from('facilities')
      .insert({
        name: facilityData.name,
        description: facilityData.description,
        address: facilityData.address,
        owner_id: facilityData.ownerId,
        sports: facilityData.sports,
        amenities: facilityData.amenities,
        photos: facilityData.photos,
        status: facilityData.status,
        price_min: facilityData.priceRange.min,
        price_max: facilityData.priceRange.max,
        latitude: facilityData.location.lat,
        longitude: facilityData.location.lng,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating facility:', error);
      return null;
    }

    return transformFacility(data);
  },

  // Update facility
  async updateFacility(id: string, updates: Partial<Facility>): Promise<Facility | null> {
    const updateData: any = {};
    
    if (updates.name) updateData.name = updates.name;
    if (updates.description) updateData.description = updates.description;
    if (updates.address) updateData.address = updates.address;
    if (updates.sports) updateData.sports = updates.sports;
    if (updates.amenities) updateData.amenities = updates.amenities;
    if (updates.photos) updateData.photos = updates.photos;
    if (updates.status) updateData.status = updates.status;
    if (updates.priceRange) {
      updateData.price_min = updates.priceRange.min;
      updateData.price_max = updates.priceRange.max;
    }
    if (updates.location) {
      updateData.latitude = updates.location.lat;
      updateData.longitude = updates.location.lng;
    }

    const { data, error } = await supabase
      .from('facilities')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating facility:', error);
      return null;
    }

    return transformFacility(data);
  },

  // Search facilities
  async searchFacilities(searchTerm: string, filters?: {
    sport?: string;
    priceRange?: { min: number; max: number };
    rating?: number;
  }): Promise<Facility[]> {
    let query = supabase
      .from('facilities')
      .select('*')
      .eq('status', 'approved');

    // Text search
    if (searchTerm) {
      query = query.or(`name.ilike.%${searchTerm}%,address.ilike.%${searchTerm}%`);
    }

    // Sport filter
    if (filters?.sport) {
      query = query.contains('sports', [filters.sport]);
    }

    // Price range filter
    if (filters?.priceRange) {
      query = query
        .gte('price_min', filters.priceRange.min)
        .lte('price_max', filters.priceRange.max);
    }

    // Rating filter
    if (filters?.rating) {
      query = query.gte('rating', filters.rating);
    }

    const { data, error } = await query.order('rating', { ascending: false });

    if (error) {
      console.error('Error searching facilities:', error);
      return [];
    }

    return data.map(transformFacility);
  },
};