import { create } from "zustand";

type ModalType =
  | "my-account"
  | "deposit"
  | "withdrawal"
  | "custom-service"
  | "betting-record"
  | "account-record"
  | "internal-message"
  | null;

interface ModalStore {
  activeModal: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  activeModal: null,
  openModal: (type) => set({ activeModal: type }),
  closeModal: () => set({ activeModal: null }),
}));



interface ProfileStore {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  activeTab: "my-account",
  setActiveTab: (tabId) => set({ activeTab: tabId }),
}));