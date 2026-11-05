// Shared by the admin forms and server validation. Keep values stable for saved data.
export const PROJECT_STAGES = [
  'Enquiry',
  'Design',
  'Production',
  'Shipping',
  'Installation',
  'Completed',
];
export const PROJECT_PRIORITIES = ['Low', 'Normal', 'High'];
export const EMPTY_PROJECT = {
  name: '',
  client: '',
  owner: '',
  due: '',
  status: 'Enquiry',
  priority: 'Normal',
  notes: '',
};
export const STORY_CATEGORIES = [
  'Whole-home cabinetry',
  'Kitchen',
  'Wardrobe',
  'Laundry',
  'Bathroom',
  'Other',
];
export const EMPTY_STORY = {
  title: '',
  location: '',
  category: STORY_CATEGORIES[0],
  description: '',
  published: false,
  media: [],
};
export const MEDIA_FORMATS = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'video/mp4': 'mp4',
  'video/webm': 'webm',
};
export const MEDIA_LIMITS = {
  count: 12,
  fileBytes: 50 * 1024 * 1024,
  uploadBytes: 60 * 1024 * 1024,
};
