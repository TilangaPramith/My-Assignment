
export const sanitizeFirebaseUser = (user: any) => {
  if (!user) return null;

  return {
    uid: user?.uid,
    email: user?.email,
    displayName: user?.displayName,
    photoURL: user?.photoURL,
    emailVerified: user?.emailVerified,
    address: user?.address,
    isFirstTime: user?.isFirstTime || true,
    phoneNumber: user?.phoneNumber
  };
};