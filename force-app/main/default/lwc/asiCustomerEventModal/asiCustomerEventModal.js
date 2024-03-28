import { LightningElement } from 'lwc';

export default class AsiCustomerEventModal extends LightningElement {

    handleClose() {
        // Close the modal
        this.dispatchEvent(new CustomEvent('close'));
        console.log('++++ Distpatch Event Close');
    }

    handleSave() {
        // Save the changes and close the modal
        this.dispatchEvent(new CustomEvent('save'));
        console.log('++++ Distpatch Event Save');
    } 
    
    handleStatusChange(event) {
        if (event.detail.status === 'FINISHED') {
            // Close the modal
            this.dispatchEvent(new CustomEvent('close'));
        }
    }

}