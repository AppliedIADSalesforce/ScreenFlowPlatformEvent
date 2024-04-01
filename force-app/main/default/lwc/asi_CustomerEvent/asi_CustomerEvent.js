import { LightningElement, api, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const accountFields = [    
    'Account.Trigger_Customer_Event_Screen__c' // Trigger_Customer_Event_Screen__c is True or False
];

export default class asi_CustomerEvent extends LightningElement {
@track isModalOpen = undefined;
@track accountField;
@track record;

@api recordId; // This is the Id of the record this component is on (in this case, an Account)

@wire(getRecord, { recordId: '$recordId', fields: accountFields })
wiredAccount({ error, data }) {
    if (data) {
        console.log('++++ 1st: ' + data.fields.Trigger_Customer_Event_Screen__c.value + this.recordId);
        this.record = data;
        this.error = undefined;

        console.log('++++ value of isModalOpen ' + this.isModalOpen);
        if(this.isModalOpen != data.fields.Trigger_Customer_Event_Screen__c.value && this.isModalOpen != undefined){
                   this.isModalOpen = data.fields.Trigger_Customer_Event_Screen__c.value;
        }
        else if (this.isModalOpen == undefined){
            this.isModalOpen = false;
        }
       

    } else if (error) {
        console.log('++++' + error);
        this.error = error;
        this.record = undefined;
    }
}



// get accountField() { 
//     if(this.record.data) {
//         console.log('++++ 2nd: ' + this.record.data);
//         return this.record.data.fields.Trigger_Customer_Event_Screen__c.value; 
        
//     }
//     console.log('++++ returning blank');
//     return '';
// }

    handleFieldChange() {        
        // if(this.accountField === true){
        //     console.log('++++ Value passed to accountField for handleFieldChange: ' + this.accountField);            
        // Open the modal when the field is changed
        this.isModalOpen = true;
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