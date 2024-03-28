import { LightningElement } from 'lwc';

export default class asi_CustomerEventModal extends LightningElement {
    handleClose() {
        // Close the modal
        this.dispatchEvent(new CustomEvent('close'));
    }

    handleSave() {
        // Save the changes and close the modal
        this.dispatchEvent(new CustomEvent('save'));
    }
}