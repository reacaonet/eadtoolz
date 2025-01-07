import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Plan } from '../types/plan';

const PLANS_COLLECTION = 'plans';

export const planService = {
  async getPlans(): Promise<Plan[]> {
    const plansCollection = collection(db, PLANS_COLLECTION);
    const plansSnapshot = await getDocs(plansCollection);
    return plansSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Plan));
  },

  async createPlan(plan: Omit<Plan, 'id'>): Promise<string> {
    const plansCollection = collection(db, PLANS_COLLECTION);
    const docRef = doc(plansCollection);
    await setDoc(docRef, plan);
    return docRef.id;
  },

  async updatePlan(id: string, plan: Partial<Plan>): Promise<void> {
    const planRef = doc(db, PLANS_COLLECTION, id);
    await updateDoc(planRef, plan);
  },

  async deletePlan(id: string): Promise<void> {
    const planRef = doc(db, PLANS_COLLECTION, id);
    await deleteDoc(planRef);
  }
};
