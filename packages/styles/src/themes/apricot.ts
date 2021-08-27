import { OrbitTheme } from "./types";

/*
POTENTIALLY MISSING:
- letterSpacings -> YES
- breakpoints
*/

export const ApricotTheme: OrbitTheme = {
    name: "apricot",
    space: [".25rem", ".5rem", ".75rem", "1rem", "1.25rem", "1.5rem", "2rem", "2.5rem", "3rem", "3.5rem", "4rem", "4.5rem", "5rem"],
    // TODO FRANK: How many font sizes we realistically need.
    fontSizes: {
        1: ".625rem",
        2: ".75rem",
        3: ".875rem",
        4: "1rem",
        5: "1.125rem",
        6: "1.375rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.5rem",
        "subheadline": "3.75rem",
        "headline": "5rem"
    },
    fontWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    lineHeights: [1, 1.2, 1.25, 1.3333333, 1.454595, 1.5],
    // TODO FRANK: How many border widths we realistically need. I do think only need one.
    borderWidths: [".125rem", ".25rem", ".5rem", "1rem", "2rem"],
    borderRadii: [".125rem", ".25rem", ".5rem", "1rem"],
    boxShadows: {
        common: {
            "alias-skim": "$box-shadows-1",
            "alias-lifted": "$box-shadows-2",
            "alias-raised": "$box-shadows-3",
            "alias-floating": "$box-shadows-4",
        },
        light: [`
            0 0.1px 0.3px rgba(0, 0, 0, 0.022),
            0 0.1px 0.7px rgba(0, 0, 0, 0.032),
            0 0.3px 1.3px rgba(0, 0, 0, 0.04),
            0 0.4px 2.2px rgba(0, 0, 0, 0.048),
            0 0.8px 4.2px rgba(0, 0, 0, 0.058),
            0 2px 10px rgba(0, 0, 0, 0.08)
            `, `
            0 0.2px 0.6px rgba(0, 0, 0, 0.02),
            0 0.5px 1.3px rgba(0, 0, 0, 0.028),
            0 0.9px 2.5px rgba(0, 0, 0, 0.035),
            0 1.6px 4.5px rgba(0, 0, 0, 0.042),
            0 2.9px 8.4px rgba(0, 0, 0, 0.05),
            0 7px 20px rgba(0, 0, 0, 0.07)
            `, `
            0 0.3px 1.1px rgba(0, 0, 0, 0.017),
            0 0.7px 2.7px rgba(0, 0, 0, 0.024),
            0 1.3px 5px rgba(0, 0, 0, 0.03),
            0 2.2px 8.9px rgba(0, 0, 0, 0.036),
            0 4.2px 16.7px rgba(0, 0, 0, 0.043),
            0 10px 40px rgba(0, 0, 0, 0.06)
            `, `
            0 1.1px 2.2px -5px rgba(0, 0, 0, 0.022),
            0 2.7px 5.3px -5px rgba(0, 0, 0, 0.032),
            0 5px 10px -5px rgba(0, 0, 0, 0.04),
            0 8.9px 17.9px -5px rgba(0, 0, 0, 0.048),
            0 16.7px 33.4px -5px rgba(0, 0, 0, 0.058),
            0 40px 80px -5px rgba(0, 0, 0, 0.08)
            `
        ],
        dark: [`
            0 0.3px 1.1px rgba(0, 0, 0, 0.056),
            0 0.7px 2.7px rgba(0, 0, 0, 0.081),
            0 1.3px 5px rgba(0, 0, 0, 0.1),
            0 2.2px 8.9px rgba(0, 0, 0, 0.119),
            0 4.2px 16.7px rgba(0, 0, 0, 0.144),
            0 10px 40px rgba(0, 0, 0, 0.2)
            `, `
            0 0.2px 0.6px rgba(0, 0, 0, 0.056),
            0 0.5px 1.3px rgba(0, 0, 0, 0.081),
            0 0.9px 2.5px rgba(0, 0, 0, 0.1),
            0 1.6px 4.5px rgba(0, 0, 0, 0.119),
            0 2.9px 8.4px rgba(0, 0, 0, 0.144),
            0 7px 20px rgba(0, 0, 0, 0.2)
            `, `
            0 0.3px 1.1px rgba(0, 0, 0, 0.056),
            0 0.7px 2.7px rgba(0, 0, 0, 0.081),
            0 1.3px 5px rgba(0, 0, 0, 0.1),
            0 2.2px 8.9px rgba(0, 0, 0, 0.119),
            0 4.2px 16.7px rgba(0, 0, 0, 0.144),
            0 10px 40px rgba(0, 0, 0, 0.2)
            `, `
            0 0.7px 2.2px rgba(0, 0, 0, 0.034),
            0 1.7px 5.3px rgba(0, 0, 0, 0.048),
            0 3.1px 10px rgba(0, 0, 0, 0.06),
            0 5.6px 17.9px rgba(0, 0, 0, 0.072),
            0 10.4px 33.4px rgba(0, 0, 0, 0.086),
            0 25px 80px rgba(0, 0, 0, 0.12)
            `
        ]
    },
    // TODO FRANK: What do we need here? How manu values and which values?
    zIndices: [1, 2, 3, 4, 5],
    colors: {
        common: {
            white: "#FFF",
            black: "#000",
            marine: [
                "hsla(222, 100%, 96%, 1)",
                "hsla(222, 26%, 79%, 1)",
                "hsla(222, 16%, 65%, 1)",
                "hsla(220, 15%, 54%, 1)",
                "hsla(220, 18%, 45%, 1)",
                "hsla(222, 24%, 38%, 1)",
                "hsla(222, 30%, 32%, 1)",
                "hsla(222, 37%, 27%, 1)",
                "hsla(221, 45%, 22%, 1)",
                "hsla(222, 63%, 15%, 1)"
            ],
            sunray: [
                "hsla(38, 100%, 95%, 1)",
                "hsla(39, 97%, 85%, 1)",
                "hsla(39, 98%, 80%, 1)",
                "hsla(39, 97%, 75%, 1)",
                "hsla(39, 97%, 70%, 1)",
                "hsla(39, 97%, 65%, 1)",
                "hsla(38, 97%, 60%, 1)",
                "hsla(36, 96%, 55%, 1)",
                "hsla(35, 96%, 50%, 1)",
                "hsla(32, 96%, 45%, 1)"
            ],
            moonstone: [
                "hsla(180, 28%, 95%, 1)",
                "hsla(180, 30%, 88%, 1)",
                "hsla(178, 31%, 80%, 1)",
                "hsla(179, 31%, 71%, 1)",
                "hsla(179, 30%, 65%, 1)",
                "hsla(179, 30%, 59%, 1)",
                "hsla(179, 29%, 56%, 1)",
                "hsla(179, 27%, 52%, 1)",
                "hsla(179, 28%, 48%, 1)",
                "hsla(179, 34%, 42%, 1)"
            ],
            cloud: [
                "hsla(223, 11%, 95%, 1)",
                "hsla(223, 12%, 87%, 1)",
                "hsla(223, 13%, 78%, 1)",
                "hsla(223, 12%, 70%, 1)",
                "hsla(223, 13%, 63%, 1)",
                "hsla(223, 13%, 56%, 1)",
                "hsla(223, 12%, 53%, 1)",
                "hsla(223, 12%, 49%, 1)",
                "hsla(223, 13%, 45%, 1)",
                "hsla(223, 15%, 38%, 1)"
            ],
            neutral: [
                "hsla(180, 14%, 99%, 1)",
                "hsla(210, 11%, 96%, 1)",
                "hsla(225, 14%, 95%, 1)",
                "hsla(228, 13%, 92%, 1)",
                "hsla(220, 12%, 91%, 1)",
                "hsla(223, 13%, 89%, 1)",
                "hsla(218, 9%, 83%, 1)",
                "hsla(223, 6%, 77%, 1)",
                "hsla(223, 5%, 71%, 1)",
                "hsla(223, 4%, 64%, 1)"
            ],
            "neutral-dark": [
                "hsla(220, 6%, 56%, 1)",
                "hsla(220, 6%, 52%, 1)",
                "hsla(220, 6%, 48%, 1)",
                "hsla(220, 6%, 44%, 1)",
                "hsla(220, 6%, 40%, 1)",
                "hsla(220, 6%, 36%, 1)",
                "hsla(220, 6%, 32%, 1)",
                "hsla(220, 6%, 28%, 1)",
                "hsla(220, 6%, 24%, 1)",
                "hsla(220, 6%, 20%, 1)"
            ],
            beetle: [
                "hsla(349, 100%, 95%, 1)",
                "hsla(348, 97%, 86%, 1)",
                "hsla(348, 98%, 77%, 1)",
                "hsla(348, 98%, 67%, 1)",
                "hsla(348, 97%, 60%, 1)",
                "hsla(348, 98%, 53%, 1)",
                "hsla(348, 90%, 51%, 1)",
                "hsla(348, 83%, 50%, 1)",
                "hsla(348, 81%, 48%, 1)",
                "hsla(348, 80%, 46%, 1)"
            ],
            botanic: [
                "hsla(146, 64%, 94%, 1)",
                "hsla(146, 64%, 84%, 1)",
                "hsla(146, 65%, 73%, 1)",
                "hsla(146, 65%, 62%, 1)",
                "hsla(146, 64%, 54%, 1)",
                "hsla(146, 75%, 46%, 1)",
                "hsla(145, 77%, 45%, 1)",
                "hsla(143, 80%, 42%, 1)",
                "hsla(141, 83%, 40%, 1)",
                "hsla(138, 89%, 36%, 1)"
            ],
            primary: [
                "hsla(174, 61%, 94%, 1)",
                "hsla(173, 63%, 85%, 1)",
                "hsla(173, 63%, 75%, 1)",
                "hsla(173, 64%, 65%, 1)",
                "hsla(173, 64%, 50%, 1)",
                "hsla(172, 65%, 48%, 1)",
                "hsla(173, 65%, 46%, 1)",
                "hsla(172, 63%, 45%, 1)",
                "hsla(172, 64%, 43%, 1)",
                "hsla(172, 62%, 41%, 1)"
            ]
        },
        light: {
            /* Background */
            "alias-bg-1": "$white",
            "alias-bg-1-hover": "$cloud-1",
            "alias-bg-1-active": "$cloud-2",
            "alias-bg-2": "$cloud-2",
            "alias-bg-2-hover": "$cloud-3",
            "alias-bg-2-active": "$cloud-6",
            "alias-bg-3": "$cloud-1",
            "alias-bg-4": "$neutral-2",
            "alias-bg-4-hover": "$neutral-4",
            "alias-bg-4-active": "$neutral-7",
            "alias-bg-5": "$marine-6",
            "alias-bg-5-hover": "$marine-8",
            "alias-bg-5-active": "$marine-10",
            "alias-bg-6": "$neutral-1",
            "alias-bg-6-hover": "$neutral-2",
            "alias-bg-6-active": "$neutral-3",
            "alias-bg-primary-1": "$primary-5",
            "alias-bg-primary-1-hover": "$primary-8",
            "alias-bg-primary-1-active": "$primary-10",
            "alias-bg-primary-1-focus": "$primary-1",
            "alias-bg-primary-2": "$primary-1",
            "alias-bg-negative-1": "$beetle-5",
            "alias-bg-negative-1-hover": "$beetle-8",
            "alias-bg-negative-1-active": "$beetle-10",
            "alias-bg-negative-2": "$beetle-1",
            "alias-bg-warning-1": "$sunray-1",
            "alias-bg-warning-1-hover": "$sunray-8",
            "alias-bg-warning-1-active": "$sunray-10",
            "alias-bg-warning-2": "$sunray-1",
            "alias-bg-positive-1": "$botanic-5",
            "alias-bg-positive-1-hover": "$botanic-8",
            "alias-bg-positive-1-active": "$botanic-10",
            "alias-bg-positive-2": "$botanic-1",
            "alias-bg-info-1": "$marine-1",
            "alias-bg-info-1-hover": "$marine-2",
            "alias-bg-info-active": "$marine-4",
            /* Border */
            "alias-b-1": "$cloud-2",
            "alias-b-1-hover": "$cloud-4",
            "alias-b-1-active": "$cloud-6",
            "alias-b-2": "$cloud-1",
            "alias-b-3": "$neutral-6",
            "alias-b-3-hover": "$neutral-8",
            "alias-b-3-active": "$neutral-10",
            "alias-b-4": "$marine-6",
            "alias-b-4-hover": "$marine-8",
            "alias-b-primary-1": "$primary-5",
            "alias-b-primary-1-hover": "$primary-8",
            "alias-b-primary-1-active": "$primary-10",
            "alias-b-primary-1-translucent": "hsla(172, 65%, 48%, 50%)",
            "alias-b-negative-1": "$beetle-6",
            "alias-b-negative-1-hover": "$beetle-8",
            "alias-b-negative-1-active": "$beetle-10",
            "alias-b-negative-1-translucent": "hsla(348, 98%, 53%, 50%)",
            "alias-b-negative-2": "$beetle-3",
            "alias-b-warning-1": "$sunray-6",
            "alias-b-warning-1-hover": "$sunray-8",
            "alias-b-warning-1-active": "$sunray-10",
            "alias-b-positive-1": "$botanic-6",
            "alias-b-positive-1-hover": "$botanic-8",
            "alias-b-positive-1-active": "$botanic-10",
            /* Icon */
            "alias-icon-1": "$marine-10",
            "alias-icon-2": "$marine-6",
            "alias-icon-primary-1": "$primary-6",
            "alias-icon-negative-1": "$beetle-6",
            "alias-icon-negative-2": "$beetle-10",
            "alias-icon-positive-1": "$botanic-6",
            "alias-icon-positive-2": "$botanic-10",
            "alias-icon-warning-1": "$sunray-6",
            "alias-icon-warning-2": "$sunray-10",
            "alias-icon-info-1": "$marine-6",
            /* Text */
            "alias-text-1": "$marine-10",
            "alias-text-1-hover": "$marine-10",
            "alias-text-1-active": "$marine-10",
            "alias-text-2": "$marine-6",
            "alias-text-2-hover": "$marine-8",
            "alias-text-2-active": "$marine-10",
            "alias-text-3": "$cloud-6",
            "alias-text-3-hover": "$cloud-8",
            "alias-text-3-active": "$cloud-10",
            "alias-text-4": "$marine-4",
            "alias-text-primary-1": "$primary-6",
            "alias-text-primary-1-hover": "$primary-8",
            "alias-text-primary-1-active": "$primary-8",
            "alias-text-negative-1": "$beetle-6",
            "alias-text-negative-1-hover": "$beetle-8",
            "alias-text-negative-1-active": "$beetle-10",
            "alias-text-negative-2": "$beetle-10",
            "alias-text-info-1": "$marine-6",
            "alias-text-info-1-hover": "$marine-8",
            "alias-text-info-1-active": "$marine-10",
            "alias-text-positive-1": "$botanic-6",
            "alias-text-positive-1-hover": "$botanic-8",
            "alias-text-positive-1-active": "$botanic-10",
            "alias-text-positive-2": "$botanic-10",
            "alias-text-warning-1": "$sunray-6",
            "alias-text-warning-1-hover": "$sunray-8",
            "alias-text-warning-1-active": "$sunray-10",
            "alias-text-warning-2": "$sunray-10",
            "alias-text-input-selection": "$marine-6",
            "alias-text-input-placeholder": "$marine-3"
        },
        dark: {
            /* Background */
            "alias-bg-1": "#2B2F3C",
            "alias-bg-1-hover": "$cloud-10",
            "alias-bg-1-active": "$cloud-9",
            "alias-bg-2": "$cloud-9",
            "alias-bg-2-hover": "$cloud-10",
            "alias-bg-2-active": "$cloud-7",
            "alias-bg-3": "$cloud-10",
            "alias-bg-4": "$neutral-dark-9",
            "alias-bg-4-hover": "$neutral-dark-4",
            "alias-bg-4-active": "$neutral-dark-2",
            "alias-bg-5": "$marine-7",
            "alias-bg-5-hover": "$marine-6",
            "alias-bg-5-active": "$marine-5",
            "alias-bg-6": "$neutral-dark-10",
            "alias-bg-6-hover": "$neutral-dark-9",
            "alias-bg-6-active": "$neutral-dark-8",
            "alias-bg-primary-1": "$primary-8",
            "alias-bg-primary-1-hover": "$primary-6",
            "alias-bg-primary-1-active": "$primary-5",
            "alias-bg-primary-1-focus": "$neutral-dark-9",
            "alias-bg-primary-2": "$neutral-dark-9",
            "alias-bg-negative-1": "$beetle-8",
            "alias-bg-negative-1-hover": "$beetle-6",
            "alias-bg-negative-1-active": "$beetle-5",
            "alias-bg-negative-2": "$beetle-10",
            "alias-bg-warning-1": "$sunray-8",
            "alias-bg-warning-1-hover": "$sunray-6",
            "alias-bg-warning-1-active": "$sunray-5",
            "alias-bg-warning-2": "$sunray-10",
            "alias-bg-positive-1": "$botanic-8",
            "alias-bg-positive-1-hover": "$botanic-6",
            "alias-bg-positive-1-active": "$botanic-5",
            "alias-bg-positive-2": "$botanic-10",
            "alias-bg-info-1": "$marine-7",
            "alias-bg-info-1-hover": "$marine-5",
            "alias-bg-info-active": "$marine-4",
            /* Border */
            "alias-b-1": "$neutral-dark-7",
            "alias-b-1-hover": "$neutral-dark-5",
            "alias-b-1-active": "$neutral-dark-4",
            "alias-b-2": "$neutral-dark-9",
            "alias-b-3": "$neutral-dark-5",
            "alias-b-4": "$marine-5",
            "alias-b-4-hover": "$marine-7",
            "alias-b-primary-1": "$primary-8",
            "alias-b-primary-1-hover": "$primary-5",
            "alias-b-primary-1-active": "$primary-4",
            "alias-b-primary-1-translucent": "hsla(172, 63%, 45%, 50%)",
            "alias-b-negative-1": "$beetle-8",
            "alias-b-negative-1-hover": "$beetle-7",
            "alias-b-negative-1-active": "$beetle-6",
            "alias-b-negative-1-translucent": "hsla(348, 83%, 50%, 50%)",
            "alias-b-negative-2": "$beetle-3",
            "alias-b-warning-1": "$sunray-8",
            "alias-b-warning-1-hover": "$sunray-7",
            "alias-b-warning-1-active": "$sunray-6",
            "alias-b-positive-1": "$botanic-8",
            "alias-b-positive-1-hover": "$botanic-7",
            "alias-b-positive-1-active": "$botanic-6",
            /* Icon */
            "alias-icon-1": "$white",
            "alias-icon-2": "$cloud-6",
            "alias-icon-primary-1": "$primary-8",
            "alias-icon-negative-1": "$beetle-8",
            "alias-icon-negative-2": "$beetle-1",
            "alias-icon-positive-1": "$botanic-8",
            "alias-icon-positive-2": "$botanic-1",
            "alias-icon-warning-1": "$sunray-8",
            "alias-icon-warning-2": "$sunray-1",
            "alias-icon-info-1": "$marine-2",
            /* Text */
            "alias-text-1": "$white",
            "alias-text-1-hover": "$white",
            "alias-text-1-active": "$white",
            "alias-text-2": "$cloud-4",
            "alias-text-2-hover": "$cloud-2",
            "alias-text-2-active": "$cloud-1",
            "alias-text-3": "$cloud-8",
            "alias-text-3-hover": "$cloud-7",
            "alias-text-3-active": "$cloud-6",
            "alias-text-4": "$marine-4",
            "alias-text-primary-1": "$alias-primary-6",
            "alias-text-primary-1-hover": "$alias-primary-5",
            "alias-text-primary-1-active": "$alias-primary-5",
            "alias-text-negative-1": "$beetle-8",
            "alias-text-negative-1-hover": "$beetle-7",
            "alias-text-negative-1-active": "$beetle-6",
            "alias-text-negative-2": "$beetle-1",
            "alias-text-warning-1": "$sunray-8",
            "alias-text-warning-1-hover": "$sunray-7",
            "alias-text-warning-1-active": "$sunray-6",
            "alias-text-warning-2": "$sunray-1",
            "alias-text-positive-1": "$botanic-8",
            "alias-text-positive-1-hover": "$botanic-7",
            "alias-text-positive-1-active": "$botanic-6",
            "alias-text-positive-2": "$botanic-1",
            "alias-text-info-1": "$marine-2",
            "alias-text-info-1-hover": "$marine-4",
            "alias-text-info-1-active": "$marine-5",
            "alias-text-input-selection": "$white",
            "alias-text-input-placeholder": "$marine-3"
        }
    }
};
