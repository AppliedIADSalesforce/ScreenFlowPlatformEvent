import { LightningElement, api } from 'lwc';
// import { getRecord } from 'lightning/uiRecordApi';

export default class AsiCustomerEventModal extends LightningElement {
    @api recordId; // This is the Id of the record this component is on (in this case, an Account)
    
    get inputVariables() {
        return [
          {
            // Match with the input variable name declared in the flow.
            name: "recordId",
            type: "String",
            // Initial value to send to the flow input.
            value: this.recordId,
          },
        ];
        }
    

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