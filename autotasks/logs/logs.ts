import axios from 'axios';
import { Buffer } from 'buffer';

export async function handler(data: any) {
    const payload = data.request.body.events;
    const { RAND_API_KEY } = data.secrets;
    var date = + new Date();
    var hashedDate = date + RAND_API_KEY;
    var encodedKey = Buffer.from(hashedDate, 'utf-8').toString('base64');

    var url = "https://rand-backend-dev.azurewebsites.net/contracts/log-event";

    // filter events
    var onlyEvents = payload[0].matchReasons.filter((e: any) => e.type === "event");
    if (onlyEvents.length === 0) return;

    // address sc
    var addressSc = payload[0].matchedAddresses;

    // build a promise array with body, params and axios post
    var eventsWithBody = onlyEvents.map((e: any) => {
        let signature = e.signature;
        var body = {
            name: signature.substring(0, signature.indexOf("(")),
            properties: {
                address: addressSc,
                params: {
                    ...e.params,
                },
            },
        };
        var json = JSON.stringify(body);
        return () =>
            axios.post(url, json, {
                headers: {
                    "Content-Type": "application/json",
                    "APP-ID": encodedKey,
                },
            });
    });

    // execute all promises
    try {
        await Promise.all(eventsWithBody.map((e: any) => e()));
    } catch (error) {
        console.error(error, "Error calling backend");
    }
}
