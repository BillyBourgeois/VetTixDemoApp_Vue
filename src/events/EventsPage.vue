<template>
    <div class="container">
        <div class="row">
            <h1>Search Events</h1>
        </div>

        <div class="row">
            <div class="col-sm-7">
                <form class="form form-horizontal" @submit.prevent="handleSubmit">

                    <div class="">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="eventTypeID">Type</label>
                                    <select name="eventTypeID" v-model="eventTypeID" class="form-control" id="type">
                                        <option value="">Any</option>
                                        <option v-for="eventType in eventTypes" :key="eventType.id" v-bind:value="eventType.id"> {{eventType.name}}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="type">State</label>
                                    <select name="stateCode" v-model="stateCode" class="form-control" id="type">
                                        <option value="">Any</option>
                                        <option v-for="state in states" :key="state.code" v-bind:value="state.code"> {{state.name}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="eventStatus">Status</label>
                                    <select name="eventStatus" class="form-control" id="eventStatus">
                                        <option value="all">All Events</option>
                                        <option value="open">Open Events</option>
                                        <option value="lottery">Events in Lottery</option>
                                        <option value="fcfs">First Come - First Serve</option>
                                        <option value="popularity">Most Popular</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="sortBy">Sort By</label>
                                    <select name="sortBy" v-model="sortBy" class="form-control" id="type">
                                        <option value="dateAscending">Event Date (Soonest)</option>
                                        <option value="dateDescending">Event Date (Farthest)</option>
                                        <option value="ticketsAvailableAscending">Most Tickets Available</option>
                                        <option value="ticketsAvailableDescending">Least Tickets Avaialable</option>
                                        <option value="popularity">Most Popular</option>
                                        <option value="titleAscending">Event Title (A-Z)</option>
                                        <option value="titleDescending">Event Title (Z-A)</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                        <div class="row">
                            <div class="form-group col-sm-5">
                                <div class="form-group">
                                    <button class="btn btn-primary" :disabled="searchingEvents">Submit</button>
                                    <img alt v-show="searchingEvents" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />

                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-sm-4 offset-sm-1   mb-5 mt-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">User Information</h5>
                        <p class="card-text">
                            <strong>Name: </strong>{{user.firstName}} {{user.lastName}}<br />
                            <strong>Status: </strong>{{user.branchShortDescription}} - {{user.statusShortDescription}}<br />
                            <strong>Coins: </strong>{{user.numCoins}}<br />
                            <strong>Site: </strong>{{user.siteName}}<br />

                        </p>

                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-show="foundEvents">
            <div class="col-12">
                <div class="">
                    <div class="table-responsive-md">
                        <table class="table table-striped table-dark table-sm">
                            <thead>
                                <tr>
                                    <th scope="col">&nbsp;</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Starts</th>
                                    <th scope="col">Ends</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">Available</th>
                                    <th></th>
                                </tr>

                            </thead>
                            <tbody>
                                <tr v-for="event in events" :key="event.id">
                                    <td width="150" class="align-middle">
                                        <img width="200" class="card-img-top" v-bind:src="event.imageURL" v-bind:alt="event.title">
                                    </td>
                                    <td class="align-middle">{{decode(event.title)}}<br/>{{event.title}}</td>

                                    <td class="align-middle">{{formatDateTime(event.startDate, event.startTime)}}</td>
                                    <td class="align-middle">{{formatDateTime(event.endDate, event.endTime)}}</td>
                                    <td class="align-middle">{{event.city}}, {{event.stateCode}}</td>
                                    <td class="align-middle" align="center">{{event.ticketsAvailable}}</td>
                                    <td width="200">
                                        <div class="row mb-3 mt-1">
                                            <div class="col-sm-12">
                                                <form class="form">
                                                    <button type="button" v-on:click="getEventDetails(event.id)" class="col-5 btn btn-primary btn-sm mr-2" data-toggle="modal" data-target="#MoreInfoModal">
                                                        Details
                                                    </button>

                                                    <button type="button" v-on:click="getInventory(event.id, event.title)" class=" offset col-5 btn btn-secondary btn-sm" data-toggle="modal" data-target="#InventoryModal">
                                                        Inventory
                                                    </button>
                                                </form>
                                            </div>

                                        </div>
                                        <div class="row mb-1">
                                            <div class="">
                                                <form @submit.prevent="getAdjacentSeats" class="form col-sm-12">
                                                    <div class="input-group input-group-sm">
                                                        <input type="number" min="2" max="10" class="form-control" name="numberOfSeats" v-model="numberOfSeats" placeholder="Number of Seats">
                                                        <div class="input-group-append">
                                                            <button type="button" class="btn btn-secondary btn-sm" v-on:click="getAdjacentSeats(event.id, event.title, numberOfSeats)" data-toggle="modal" data-target="#InventoryModal">
                                                                Sit Together
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item" :disabled="previousDisabled"><button v-on:click="handlePrevious" type="button" class="page-link" :disabled="previousDisabled">Previous</button></li>

                            <li class="page-item"><button v-on:click="handleNext" type="button" class="page-link" :disabled="nextDisabled" >Next</button></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>


        <!-- More Info Modal -->
        <div class="modal fade" id="MoreInfoModal" tabindex="-1" role="dialog" aria-labelledby="MoreInfoModal" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Event Details</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                        <div class="card">
                            <img class="card-img-top" v-bind:src="eventDetails.imageURL" v-bind:alt="eventDetails.title">
                            <div class="card-body">
                                <h5 class="card-title">{{eventDetails.title}}</h5>
                                <p class="card-text">
                                    <strong>Starts: </strong>{{formatDateTime(eventDetails.startDate, eventDetails.startTime)}}<br />
                                    <strong>Ends: </strong>{{formatDateTime(eventDetails.endDate, eventDetails.endTime)}}<br />
                                    <strong>Available Tickets: </strong>{{eventDetails.ticketsAvailable}} of {{eventDetails.totalTickets}}<br />
                                    <strong>Request Type: </strong>{{eventDetails.ticketRequestsStatus}} <br />
                                    <strong>Delivery Method: </strong>{{eventDetails.deliveryMethod}} <br />
                                    <strong>Starts: </strong>{{formatDateTime(eventDetails.startDate, eventDetails.startTime)}}<br />
                                    <strong>Special Instructions: </strong>{{eventDetails.specialInstructions}}<br />

                                    <strong>Venue: </strong><br />
                                    <small>
                                        {{eventDetails.venueStreet1}}
                                        {{eventDetails.venueStreet2}}<br />
                                        {{eventDetails.venueCity}},  {{eventDetails.venueStateCode}} {{eventDetails.venuePostalCode}}<br />
                                    </small>
                                    <small><a v-bind:href="'tel:' + eventDetails.venuePhone">{{eventDetails.venuePhone}}</a></small>
                                    <br />
                                    <strong>Shipping Cost: </strong>${{eventDetails.shippingCost}}<br />
                                    <strong>Min/Max Tickets: </strong>{{eventDetails.minimumTickets}} to {{eventDetails.maximumTickets}}<br />
                                    <span v-for="sponsor in eventDetails.sponsors" :key="sponsor.sponsorName"><strong>Sponser: </strong>{{sponsor.sponsorName}}<br /></span>
                                </p>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Inventory Modal -->
        <div class="modal fade" id="InventoryModal" tabindex="-1" role="dialog" aria-labelledby="InventoryModal" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Ticket Inventory: {{eventDetails.title}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div v-for="ticket in inventory" :key="ticket.seat" class="card text-white bg-secondary mb-3">
                            <div class="card-header">Section: {{ticket.section}}</div>
                            <div class="card-body">
                                <h5 class="card-title">Row: {{ticket.row}}</h5>
                                <p class="card-text">Seat: {{ticket.seat}}</p>
                            </div>
                        </div>
                        <div class="row">
                            <span v-show="inventory.length === 0" class="alert alert-info">
                                sorry none found
                            </span>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import { eventsService, inventoryService } from '../services';
    import { format } from '../helpers';
    export default {
        data() {
            return {
                eventTypeID: '',
                stateCode: '',
                eventStatus: 'all',
                sortBy: 'dateAscending',
                count: 10,
                start: 1,
                submitted: false,
                eventTypes: [],
                states: [],
                previousDisabled: true,
                nextDisabled: false,
                eventDetails: {},
                inventory: [],
                numberOfSeats: 2
            }
        },
        computed: {
            user() {
                return this.$store.state.authentication.user;
            },
            searchingEvents() {
                return this.$store.state.events.status.searching;
            },
            foundEvents() {
                return this.$store.state.events.status.found;
            },
            events() {
                return this.$store.state.events.eventsObject.eventItems;
            },
            eventsObject() {
                return this.$store.state.events.eventsObject;
            }
        },
        created: function () {
            const { dispatch } = this.$store;
            eventsService.getStates().then(states => {
                this.states = states;
            });
            eventsService.getEventTypes().then(eventTypes => {
                this.eventTypes = eventTypes;
            });
            this.handleSubmit();
        },
        watch: {
        },
        methods: {
            getEventDetails(eventId) {
                this.eventDetails = {};
                eventsService.getEventDetails(eventId).then(eventDetails => {
                    this.eventDetails = eventDetails;
                });
            },
            getAdjacentSeats(eventId, eventTitle, numberOfSeats) {
                this.eventDetails = { title: eventTitle + ' (' + numberOfSeats + ')' };
                this.inventory = {};
                inventoryService.getAdjacentSeats(eventId, numberOfSeats).then(inventory => {
                    this.inventory = inventory;
                });
            },
            getInventory(eventId, eventTitle) {
                this.eventDetails = { title: eventTitle };
                this.inventory = {};
                inventoryService.getInventory(eventId).then(inventory => {
                    this.inventory = inventory;
                });
            },
            handleSubmit(e) {
                this.submitted = true;
                const { eventTypeID, stateCode, eventStatus, sortBy, count, start } = this;
                const { dispatch } = this.$store;
                dispatch('events/getEvents', { eventTypeID, stateCode, eventStatus, sortBy, count, start });
            },
            formatDateTime(date, time) {
                return format.dateTime(date, time);
            },
            handleNext(e) {
                this.start += 10;
                this.handleDisablingPagation();
                this.handleSubmit(e);
            },
            handlePrevious(e) {

                this.start -= 10;
                this.handleDisablingPagation();
                this.handleSubmit(e);
            },
            handleDisablingPagation() {
                this.nextDisabled = this.start > this.eventsObject.eventsMeta.totalRecords - 10;
                this.previousDisabled = this.start < 10;
            },
            decode(encodedString)
            {
              return he.decode(encodedString);
            }
        }
    };
</script>