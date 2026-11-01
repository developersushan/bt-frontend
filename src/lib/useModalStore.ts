import { create } from "zustand";

type ModalType = "login" | "register" |  null;

interface ModalState {
  activeModal: ModalType;
  setActiveModal: (modal: ModalType) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  setActiveModal: (modal) => set({ activeModal: modal }),
}));

interface ProfileStore {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  isProfileModalOpen: boolean;
  setProfileModalOpen: (open: boolean) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  activeTab: "my-account",
  setActiveTab: (tabId) => set({ activeTab: tabId }),
  isProfileModalOpen: false,
  setProfileModalOpen: (open) => set({ isProfileModalOpen: open }),
}));
