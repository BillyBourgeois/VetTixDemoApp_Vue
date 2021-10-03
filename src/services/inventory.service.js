import { authHeader } from '../helpers';
import { userService } from '../services';
let BaseUrl = 'https://www.vettix.org/uapi';

export const inventoryService = {
    getInventory,
    getAdjacentSeats
};

function getInventory(eventId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    let url = new URL(BaseUrl + '/inventory/' + eventId);

    return fetch(url, requestOptions).then(handleResponse).
        then(inventory => {
            return inventory;
        });
}

function getAdjacentSeats(eventId, numberOfSeats) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    let url = new URL(BaseUrl + '/inventory/' + eventId);

    return fetch(url, requestOptions).then(handleResponse).
        then(inventory => {


            var groupBy2Keys = function (array, key1, key2) {
                return array.reduce(function (storage, arrayItem) {
                    var group = key1 + ': ' + arrayItem[key1] + ', ' + key2 + ': ' + arrayItem[key2];
                    (storage[group] = storage[group] || []).push(arrayItem);
                    return storage;
                }, {});
            };

            //group seats by section and row
            var rowsOfSeats = groupBy2Keys(inventory, 'section', 'row')

            //group seats by seat numbers that are adjacent
            for (const row in rowsOfSeats) {
                //sort seats in ascending order
                const arrayOfSeats = (rowsOfSeats[row]).sort((a, b) => (a.seat > b.seat) ? 1 : -1);

                //check to see if there are enough seats in this row
                if (arrayOfSeats.length >= numberOfSeats) {


                    var adjacentSeats = [];
                    //always put the first item as the first adjacent seat
                    adjacentSeats.push(arrayOfSeats[0]);

                    for (var i = 1; i < arrayOfSeats.length; i++) {

                        // if current seat is 1 more than the last one in the array of adjacentSeats
                        if (parseInt(arrayOfSeats[i].seat) === parseInt(adjacentSeats[adjacentSeats.length - 1].seat) + 1) {

                            //store the inventory item
                            adjacentSeats.push(arrayOfSeats[i]);
                            if(adjacentSeats.length >= numberOfSeats)
                            {
                                //return first group of seats found
                                return adjacentSeats;
                            }
                        }
                        else
                        {
                            //otherwise test next set of seats to see if there is a big enough group
                            adjacentSeats = [];
                            adjacentSeats.push(arrayOfSeats[i]);
                        }
                    }
                }
            }
            //return empty array if no group of seats are big enough
            return [];
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}