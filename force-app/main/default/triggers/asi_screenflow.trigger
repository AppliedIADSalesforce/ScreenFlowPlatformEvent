trigger asi_screenflow on Account (after update) {

        List<Account> updatedAccounts = Trigger.new;
        List<Launch_Screen_Flow__e> eventsToPublish = new List<Launch_Screen_Flow__e>();
    
        for (Account acc : updatedAccounts) {
            Launch_Screen_Flow__e event = new Launch_Screen_Flow__e(
                RecordId__c = acc.Id,
                Change__c = 'Field has been changed'
            );
            eventsToPublish.add(event);
        }
    
        // Publish the platform events 
        EventBus.publish(eventsToPublish);
    }
