export async function deleteDentistRegistration(dentistRegistrationId: string) {
  const response = await fetch(`/api/dentist-registrations?slug=${dentistRegistrationId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete dentist registration');
  }
}

export async function toggleDentistRegistrationFeatured(dentistRegistrationId: string, isFeatured: boolean) {
  const response = await fetch(`/api/dentist-registrations?slug=${dentistRegistrationId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      featured: !isFeatured,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to update dentist registration status');
  }
}

export async function toggleDentistRegistrationPopular(dentistRegistrationId: string, isPopular: boolean) {
  const response = await fetch(`/api/dentist-registrations?slug=${dentistRegistrationId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      popular: !isPopular,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to update dentist registration status');
  }
}
