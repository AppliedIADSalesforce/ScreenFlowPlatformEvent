import { LightningElement,api, track } from 'lwc';
import LightningModal from 'lightning/modal';

export default class FlowModal extends LightningModal {
    @api modalHeaderLabel;
    @api screenFlowApiName;
    @api inputVariables = [];
    @api flowFinishedBehaviour;
    @track isShowHeader = false;

    handleOpenFlow(event){
        if(this.modalHeaderLabel){
            this.isShowHeader = true;
        }
        if(this.flowFinishedBehaviour == 'NONE' && (event.detail.status === 'FINISHED' || event.detail.status === 'FINISHED_SCREEN')){
            this.close('modal closed, flow status is ' + event.detail.status);
        }
    }
    closeModal() {
        this.close('modal closed manually');
      }

}