export function configureFakeBackend() {
    let users = [{ id: 1, username: 'billy+testing@notarealemail.com', password: 'UKi6y0OEwcWKII2R' }];
    let userInfo =
    {
        "firstName": "Billy",
        "lastName": "Bourgeois",
        "numCoins": 20,
        "statusID": 3,
        "statusShortDescription": "Veteran",
        "statusLongDescription": "I am a Veteran",
        "branchID": 1,
        "branchShortDescription": "Army",
        "branchLongDescription": "United States Army",
        "branchAbbreviatedDescription": "U.S. Army",
        "siteID": 1,
        "siteName": "Vet Tix"
    };
    let eventList = {
        "events": [{
            "id": 245916,
            "title": "Hollywood Casino 400",
            "startDate": "2020-10-08",
            "startTime": "10:00:00",
            "endDate": "2020-10-08",
            "endTime": "14:00:00",
            "city": "Kansas City",
            "stateCode": "KS",
            "postalCode": "66111",
            "deliveryMethod": "thirdParty",
            "totalTickets": 10,
            "ticketsAvailable": 4,
            "ticketRequestsStatus": "lottery",
            "ticketingStatus": "lottery_open",
            "imageURL": "https://static-cdn.vettix.org/images/hd/design/site_0/logo.png"
        }],
        "eventsMeta": {
            "totalRecords": 100,
            "start": 11,
            "end": 20
        },
        "ads": {
            "interleave": 5,
            "ads": [{
                "url": "https://www.fngtickets.com",
                "bannerURL": "https://static-cdn.vettix.org/hd/design/fngban10.jpg",
                "adText": "Visit FNG Tickets for more ticket options"
            }]
        }
    };
    let eventDetails = {
        "id": 245916,
        "title": "Hollywood Casino 400",
        "startDate": "2020-10-08",
        "startTime": "10:00:00",
        "endDate": "2020-10-08",
        "endTime": "14:00:00",
        "eventStatus": "closed",
        "deliveryMethod": "thirdParty",
        "totalTickets": 10,
        "ticketsAvailable": 4,
        "ticketRequestsStatus": "lottery",
        "imageURL": "https://static-cdn.vettix.org/images/hd/design/site_0/logo.png",
        "inMaintenance": false,
        "inMaintenanceMessage": "",
        "videoURL": "",
        "statusMessage": "",
        "hasEventAlert": false,
        "adaRequirementVerbiage": "",
        "sponsors": [{
            "sponsorName": "NASCAR",
            "isWebSiteLink": false,
            "url": "https://ei-cdn.vettix.org/sponsors/nascar.jpg"
        }],
        "specialInstructions": "",
        "deliveryInfo": "",
        "disclaimer": "",
        "venueStreet1": "123 Oak Ln",
        "venueStreet2": "",
        "venueCity": "Kansas City",
        "venueStateCode": "KS",
        "venuePostalCode": "66111",
        "venuePhone": "(813) 555-1212",
        "availableTime": "2020-10-07 13:00:00",
        "lotteryStartTime": "2020-10-05 12:00:00",
        "lotteryEndTime": "2020-10-07 12:00:00",
        "minimumTickets": 1,
        "maximumTickets": 4,
        "ticketsIteration": 1,
        "countType": "hard",
        "shippingCost": 7.97
    };
    let statesList = [
        { "id": 1, "code": "AL", "name": "Alabama" },
        { "id": 2, "code": "AK", "name": "Alaska" },
        { "id": 3, "code": "AZ", "name": "Arizona" }];
    let eventTypes = [
        { "id": 1, "name": "Football" },
        { "id": 2, "name": "Baseball" },
        { "id": 3, "name": "Concert" }];
    let inventory = [{
        "section": "304",
        "row": "10",
        "seat": "1"
    }, {
        "section": "304",
        "row": "10",
        "seat": "3"
    }, {
        "section": "304",
        "row": "10",
        "seat": "2"
    }, {
        "section": "304",
        "row": "11",
        "seat": "4"
    },
    {
        "section": "301",
        "row": "10",
        "seat": "1"
    }, {
        "section": "303",
        "row": "10",
        "seat": "2"
    }, {
        "section": "303",
        "row": "10",
        "seat": "3"
    }, {
        "section": "301",
        "row": "11",
        "seat": "4"
    }]
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // authenticate
                //if (url.pathname.endsWith('/user/login') && opts.method === 'POST') {
                //    // get parameters from post request
                //    let params = JSON.parse(opts.body);

                //    // find if any user matches login credentials
                //    let filteredUsers = users.filter(user => {
                //        return user.username === params.username && user.password === params.password;
                //    });

                //    if (filteredUsers.length) {
                //        // if login details are valid return fake jwt token
                //        let user = filteredUsers[0];
                //        let responseJson = {
                //            token: 'fake-base64-encoded-jwt-token'
                //        };
                //        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                //    } else {
                //        // else return error
                //        reject('Username or password is incorrect');
                //    }

                //    return;
                //}

                // get user
                //if (url.pathname.endsWith('/user/info') && opts.method === 'GET') {
                //    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                //    if (opts.headers && opts.headers.Authorization === 'Bearer fake-base64-encoded-jwt-token') {
                //        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(userInfo)) });
                //    } else {
                //        // return 401 not authorized if token is null or invalid
                //        reject('Unauthorized');
                //    }

                //    return;
                //}

                //// get event list
                //if (url.pathname.endsWith('/event') && opts.method === 'GET') {
                //    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                //    if (opts.headers && opts.headers.Authorization === 'Bearer fake-base64-encoded-jwt-token') {
                //        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(eventList)) });
                //    } else {
                //        // return 401 not authorized if token is null or invalid
                //        reject('Unauthorized');
                //    }

                //    return;
                //}


                //// get states list
                //if (url.pathname.endsWith('/state') && opts.method === 'GET') {
                //    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                //    if (opts.headers && opts.headers.Authorization === 'Bearer fake-base64-encoded-jwt-token') {
                //        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(statesList)) });
                //    } else {
                //        // return 401 not authorized if token is null or invalid
                //        reject('Unauthorized');
                //    }

                //    return;
                //}

                //// get event type list
                //if (url.pathname.endsWith('/event/type') && opts.method === 'GET') {
                //    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                //    if (opts.headers && opts.headers.Authorization === 'Bearer fake-base64-encoded-jwt-token') {
                //        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(eventTypes)) });
                //    } else {
                //        // return 401 not authorized if token is null or invalid
                //        reject('Unauthorized');
                //    }

                //    return;
                //}

                //// get event details
                //if (url.pathname.startsWith('/event') && opts.method === 'GET') {
                //    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                //    if (opts.headers && opts.headers.Authorization === 'Bearer fake-base64-encoded-jwt-token') {
                //        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(eventDetails)) });
                //    } else {
                //        // return 401 not authorized if token is null or invalid
                //        reject('Unauthorized');
                //    }

                //    return;
                //}

                //// get inventory for an event
                //if (url.pathname.startsWith('/inventory') && opts.method === 'GET') {
                //    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                //    if (opts.headers && opts.headers.Authorization === 'Bearer fake-base64-encoded-jwt-token') {
                //        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(inventory)) });
                //    } else {
                //        // return 401 not authorized if token is null or invalid
                //        reject('Unauthorized');
                //    }

                //    return;
                //}
                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}