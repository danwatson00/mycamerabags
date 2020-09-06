interface AuthUser {
  uid: string;
  email: string;
  emailVerified: boolean;
  providerData: any;
  photoURL: string;
  roles: string[];
}

interface GlobalGearItem {
  make: string;
  model: string;
  category: string;
  subCategory: string;
  imageUrl: string;
  description: string;
  manualUrl: string;
  specs: string;
  buyNewUrl: string;
}

interface UserGearItem {
  userId: string;
  make: string;
  model: string;
  category: string;
  subCategory: string;
  imageUrl: string;
  description: string;
  manualUrl: string;
  specs: string;
  buyNewUrl: string;
}

interface FirebaseTypes {
  doCreateUserWithEmailAndPassword(email: string, password: string): void;
  doSignInWithEmailAndPassword(email: string, password: string): void;
  doSignInWithGoogle(): void;
  doSignInWithFacebook(): void;
  doSignInWithTwitter(): void;
  doSignOut(): void;
  doPasswordReset(email: string): void;
  doSendEmailVerification(): void;
  doPasswordUpdate(password: string): void;
  onAuthUserListener(next: any, fallback: any): void;
  user(uid: string): void;
  users(): void;
  getAllUsers(): void;
  message(uid: string): void;
  messages(): void;
  getAllUsersBags(): void;
  getAllGear(): void;
  getAllBags(): void;
  getAllUsersData(): void;
  createGear(gearData: any): void;
  updateGear(item: any, id: string): void;
  deleteGear(id: string): void;
  addToUserGear(userId: string, gearData: any): Promise<any>;
  updateUserGear(item: any, id: string): void;
  deleteUserGear(userId: string, id: string): void;
  getMyGear(userId: string): void;
  getMyBags(userId: string): void;
  createBag(userId: string, bagData: any): void;
  deleteBag(userId: string, bagId: string): void;
  updateBag(userId: string, bagId: string, bagData: any): void;
  updateBagGear(userId: string, bagId: string, bagGear: any): void;
  addToUserBag(userId: string, userGearId: string, userBagId: string, rank: number): void;
  deleteFromUserBag(userId: string, userGearId: string, userBagId: string): void;
  saveImage(itemUid: string, file: File): string;
  downloadImage(filePath: string): Promise<any>;
  storage: any;
}

export type {
  AuthUser,
  FirebaseTypes,
  GlobalGearItem,
  UserGearItem
}