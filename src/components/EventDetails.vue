<template>
    <div>
        <strong>Special Instructions: </strong>{{eventDetails.specialInstructions}}<br />
        <strong>Venue: </strong><br />
        <address class="pull-right">
            {{eventDetails.venueStreet1}}
            {{eventDetails.venueStreet2}}<br />
            {{eventDetails.venueCity}},  {{eventDetails.venueStateCode}} {{eventDetails.venuePostalCode}}<br />
        </address>
        <a v-bind:href="'tel:' + eventDetails.venuePhone">{{eventDetails.venuePhone}}</a>
        <br />
        <strong>Shipping Cost: </strong>${{eventDetails.shippingCost}}<br />
        <strong>Min/Max Tickets: </strong>{{eventDetails.minimumTickets}} to {{eventDetails.maximumTickets}}<br />
        <span v-for="sponsor in eventDetails.sponsors" :key="sponsor.sponsorName"><strong>Sponser: </strong>{{sponsor.sponsorName}}<br /></span>

    </div>
</template>

<script>
    import { eventsService } from '../services';

    export default {
        name: "EventDetails",
        props: { eventId: { type: Number, required: true } },
        data() {
            return {
                eventDetails: {}
            }
        },
        created: function () {
            const { eventId } = this;
            eventsService.getEventDetails(eventId).then(eventDetails => {
                this.eventDetails = eventDetails;
            });
        },
        methods: {
            getEventDetails() {
                eventsService.getEventDetails(this.eventId).then(eventDetails => {
                    this.eventDetails = eventDetails;
                });
            }
        }
    };

</script>
<style scoped>
</style>