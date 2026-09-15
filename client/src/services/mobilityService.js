export async function getAccessibilityLocations() {
  const response = await fetch('/api/accessibility/locations');
  if (!response.ok) throw new Error('Accessibility locations could not be loaded.');
  return response.json();
}