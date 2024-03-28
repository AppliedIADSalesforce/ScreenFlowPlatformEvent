import { LightningElement, api, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const accountFields = [    
    'Account.Trigger_Customer_Event_Screen__c' // Trigger_Customer_Event_Screen__c is True or False
];

export default class asi_CustomerEvent extends LightningElement {
@track isModalOpen = false;
@track accountField;
@track record;

@api recordId; // This is the Id of the record this component is on (in this case, an Account)

@wire(getRecord, { recordId: '$recordId', fields: accountFields })
wiredAccount({ error, data }) {
    if (data) {
        console.log('++++' + data.fields.Trigger_Customer_Event_Screen__c.value);
        this.record = data;
        this.error = undefined;
    } else if (error) {
        console.log('++++' + error);
        this.error = error;
        this.record = undefined;
    }
}

get accountField() { 
    if(this.record.data) {
        console.log('++++' + this.record.data);
        return this.record.data.fields.Trigger_Customer_Event_Screen__c.value; 
        
    }
    console.log('++++ returning blank');
    return '';
}

    handleFieldChange(event) {    
        // Open the modal when the field is changed
        this.isModalOpen = true;

        // if(this.accountField){
        //     console.log('Field value is Yes');
            
        
        // }
        
    }     
    

    handleModalClose() {
        // Close the modal
        this.isModalOpen = false;
    }

    handleModalSave() {
        // Save the changes and close the modal
        this.isModalOpen = false;
    }
}