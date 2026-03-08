const BASE_URL = 'https://api.thescholarverse.site/unacademy';

export async function getBatches() {
  try {
    const res = await fetch(`${BASE_URL}/batches`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch batches');
    return await res.json();
  } catch (error) {
    console.error('API Error (getBatches):', error);
    return { success: false, data: { categories: [], batches: [] } };
  }
}

export async function getBatchDetails(batchId: string) {
  try {
    const res = await fetch(`${BASE_URL}/batches/${batchId}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch batch details');
    const result = await res.json();
    // Normalize response to always have subjects array
    return result.data || result;
  } catch (error) {
    console.error(`API Error (getBatchDetails - ${batchId}):`, error);
    return { subjects: [] };
  }
}

export async function getSubjectLectures(subjectId: string) {
  try {
    const res = await fetch(`${BASE_URL}/subjects/${subjectId}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch subject lectures');
    const result = await res.json();
    // Normalize response to always have lectures array
    return result.data || result;
  } catch (error) {
    console.error(`API Error (getSubjectLectures - ${subjectId}):`, error);
    return { lectures: [] };
  }
}

export async function getLectureVideo(lectureId: string) {
  try {
    const res = await fetch(`${BASE_URL}/video/${lectureId}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch video link');
    const result = await res.json();
    // Normalize response
    return result.data || result;
  } catch (error) {
    console.error(`API Error (getLectureVideo - ${lectureId}):`, error);
    return { download_url: '', video_urls: { stream: '', download: '' } };
  }
}
