import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const FIELD_NAME = 'Account.Trigger_Customer_Event_Screen__c';

export default class AsiCustomerEventFlowLauncher extends LightningElement {

@api recordId; // This is the ID of the record page the component is placed on
@wire(getRecord, { recordId: '$recordId', fields: [FIELD_NAME] })
record;
   
wiredRecord({ error, data }) {
    if (data) {
        // Get the field value 
        let fieldValue = data.fields.FieldName.value;
        console.log('++++ Field name value on Account -' + data.fields.FieldName.value);

        // Compare the field value with the previous value
        if (fieldValue = true) {
            // If the field value has changed, start the flow
            this.template.querySelector('lightning-flow').startFlow('Task Create Customer Event');
            console.log('++++ Yes I am now calling the flow to show the screen');
        }

        // Store the field value for the next comparison
        this.previousFieldValue = fieldValue;
    } else if (error) {
        // Handle the error
    }
}

}