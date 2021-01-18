import { IViewModelModalStore } from '../store/pro.modal/interface';
import { ProModalStore } from '../store/pro.modal';
export interface InstanceLegionsProModal {
    store: ProModalStore;
    uid: string;
    viewModel: IViewModelModalStore;
}
