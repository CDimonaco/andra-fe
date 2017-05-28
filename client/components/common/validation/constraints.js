/**
 * Created by cdimonaco on 27/05/2017.
 */

const validationConstraints = {
    newUser: {
        username: {
            presence: {
                message: "mancante"
            }
        },
        password: {
            presence: {
                message: "mancante"
            },
            length: {
                minimum: 8,
                message: "deve essere minimo di 8 caratteri"
            }
        },
        email: {
            presence: {
                message: "mancante"
            },
            email: {
                message: "non valida"
            }
        },
        ruolo: {
            numericality: {
                greaterThan: -1,
                lessThanOrEqualTo: 1,
                message: "mancante"
            }
        },
    },
    newProject:{
        nome:{
            presence:{
                message:"mancante"
            }
        },
        descrizione:{
            presence:{
                message:"mancante"
            }
        }
    },
    newSensor:{
        nome:{
            presence:"mancante"
        }
    }
};

export default validationConstraints;
