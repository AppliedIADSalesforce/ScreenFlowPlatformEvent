import { LightningElement, api, track } from 'lwc';
import { subscribe, unsubscribe, onError }  from 'lightning/empApi';
import FlowModal from 'c/flowModal';
import Id from '@salesforce/user/Id';

export default class ScreenFlowPlatformEvent extends LightningElement {
    @api uniqueKey;
    subscription = {};
    channelName = '/event/Screen_Flow_Event__e';
    myId = Id.slice(0,15);

    @track screenFlowApiName;
    @track flowFinishedBehaviour;
    @track modalHeaderLabel;
    @track isUniqueKeyMatched = false;
    @track isCurrentUrlMatched = false;
    @track targetUserIds = [];
    @track inputVariables = [];

    connectedCallback() {       
        this.registerErrorListener();
        this.handleSubscribe();
    }

    disconnectedCallback() {
        unsubscribe(this.subscription, response => {
            console.log('Un-Subscribed from Screen Flow Event');
            console.log(response);
        });
    }

    handleSubscribe() {
        const thisReference = this;
        const messageCallback = function(response) {
            let eventData = response['data']['payload'];
            thisReference.setModalFlowVar(eventData);
            if((!thisReference.targetUserIds || (thisReference.targetUserIds && thisReference.targetUserIds.includes(thisReference.myId))) && thisReference.isUniqueKeyMatched && thisReference.isCurrentUrlMatched){
                thisReference.openModal();
            }
        }

        subscribe(this.channelName, -1, messageCallback).then(response => {
            console.log('Subscribed to Screen Flow Event');
            this.subscription = response;
        });
        onError(error => {
            console.log('Error in Screen Flow Event');
            console.log(error);
        });
    }

    registerErrorListener() {
        onError(error => {
            console.log('Received error from server: ', JSON.stringify(error));
        });
    }

    async openModal() {
        const result = await FlowModal.open({
            screenFlowApiName : this.screenFlowApiName,
            flowFinishedBehaviour : this.flowFinishedBehaviour,
            inputVariables : this.inputVariables,
            modalHeaderLabel: this.modalHeaderLabel,
        });
        console.log(result);
    }

    setModalFlowVar(eventData){
        this.screenFlowApiName = eventData.Screen_Flow_API_Name__c;
        this.flowFinishedBehaviour = this.setFlowFinishBehaviour(eventData.Restart_on_Finish__c);
        this.targetUserIds = eventData.Target_User_Ids__c ? this.setTargetUserIds(eventData.Target_User_Ids__c) : null;
        this.inputVariables = eventData.Input_Variables__c ? JSON.parse(eventData.Input_Variables__c) : null;
        this.isUniqueKeyMatched = eventData.Unique_Key__c == this.uniqueKey ? true : false;
        this.modalHeaderLabel = eventData.Modal_Header_Label__c;
        this.isCurrentUrlMatched = eventData.Launch_when_current_URL_contains__c ? window.location.href.includes(eventData.Launch_when_current_URL_contains__c) : true;
    }

    setTargetUserIds(targetUserIdsInStr){
        let finalTargetUserIdArr = [];
        let targetUserIdArr = targetUserIdsInStr.split(',');
        for (let i = 0; i < targetUserIdArr.length; i++){
            finalTargetUserIdArr.push(targetUserIdArr[i].slice(0,15));
        }
        return finalTargetUserIdArr;
    }

    setFlowFinishBehaviour(isRestartOnFinish){
        if(isRestartOnFinish){
            return 'RESTART';
        }
        else{
            return 'NONE';
        }
    }

}