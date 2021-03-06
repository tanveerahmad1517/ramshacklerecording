import braintree from 'braintree-web';

// *****************************************
// Wrap braintree js functions as promises
export function braintreeClientCreate(token){
    return new Promise(function(resolve, reject){
        console.log(braintree)
        console.log(braintree.client)
        braintree.client.create({
            authorization: token
        }, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}

export function braintreeHostedFieldsCreate(client, styles, fields){
    return new Promise(function(resolve, reject){
        braintree.hostedFields.create({
            client,
            styles,
            fields
        }, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}

function braintreePaypalCreate(client){
    return new Promise(function(resolve, reject){
        braintree.paypal.create({
            client: client
        }, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}

function tokenize(hostedFieldsInstance){
    return new Promise(function(resolve, reject){
        hostedFieldsInstance.tokenize((err, data) => {
            if (err) return reject(err);
            resolve(data)
        });
    });
}
//************************************************** */

export function fetchToken(hostedFieldsInstance){
    return dispatch => {
        dispatch({
            type: 'REQUEST_START'
        })
        return tokenize(hostedFieldsInstance)
            .then( data => {
                dispatch({
                    type: 'RECEIVE_TOKEN',
                    data
                })
                dispatch({
                    type: 'REQUEST_END'
                })
            })
            .catch( error => {
                dispatch({
                    type: 'ERROR',
                    error
                })
                dispatch({
                    type: 'REQUEST_END'
                })
            })
    }
}

export function setupBraintree(styles, fields, getToken){
    return dispatch => {
        dispatch({
            type: 'REQUEST_START'
        })
        return getToken()
            .then(data => braintreeClientCreate(data.token))
            .then((client) => {
                dispatch({
                    type: 'REQUEST_END'
                })
                dispatch({
                    type: 'RECEIVE_CLIENT',
                    data: client
                })
                dispatch({
                    type: 'REQUEST_START'
                })
                braintreeHostedFieldsCreate(client, styles, fields)
                    .then(instance => {
                        dispatch({
                            type: 'RECEIVE_HOSTED_FIELDS',
                            data: instance
                        })
                        dispatch({
                            type: 'REQUEST_END'
                        })
                    })
            })
    }
}

export function setupBraintreePaypal(getToken,
                                     totalAmount, 
                                     paypalButton,
                                     handleSubmit,
                                     currency='GBP',
                                     enableShippingAddress=true,
                                     shippingAddressEditable=true){
    return dispatch => {
        dispatch({
            type: 'REQUEST_START'
        })
        return getToken()
            .then(data => braintreeClientCreate(data.token))
            .then(client => braintreePaypalCreate(client))
            .then(paypalInstance => paypalButton.addEventListener('click', 
                function (){
                    paypalInstance.tokenize({
                        flow: 'checkout',
                        intent: 'sale',
                        amount: totalAmount,
                        currency: currency,
                        displayName: 'Ramshackle Audio',
                        enableShippingAddress: enableShippingAddress,
                        shippingAddressEditable: shippingAddressEditable
                    }, (err, tokenPayload) => {
                        if (!err) {
                            handleSubmit(tokenPayload);
                        }
                        else {
                            console.log(err)
                        }
                    });
                })
            )
            .then(() => {
                dispatch({type: 'BRAINTREE_READY'});
                dispatch({type: 'REQUEST_END'});
            });
    }
}

export function setupBraintreeDropIn(getToken, containerId, totalAmount, onPaymentMethodReceived, currency='GBP'){
    return dispatch => {
        dispatch({
            type: 'REQUEST_START'
        })
        return getToken()
            .then(
                data => {
                    braintree.setup(data.token, 'dropin', {
                        container: containerId,
                        onPaymentMethodReceived,
                        onReady: (checkout) => { dispatch({type: 'BRAINTREE_READY', data: checkout})},
                        onError: data => dispatch({type: 'ERROR', error: data}),
                        paypal: {
                            singleUse: true,
                            amount: totalAmount,
                            currency: currency
                    }
                })
                dispatch({
                    type: 'REQUEST_END'
                })
            }
        )
    }
}

export function teardownBraintreeDropIn(){
    return {
        type: 'TEARDOWN'
    }
}

export function setupHostedFields(clientInstance, styles, fields){
    return dispatch => {
        dispatch({
            type: 'REQUEST_HOSTED_FIELDS'
        })
        return braintreeHostedFieldsCreate(clientInstance, styles, fields)
            .then((instance) => {
                dispatch({
                    type: 'RECEIVE_HOSTED_FIELDS',
                    data: instance
                })
                dispatch({
                    type: 'REQUEST_END'
                })
            })
    }
}

