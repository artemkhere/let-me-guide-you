export default {
    toughMoment:
        [ // A Session
            { // A Guide
                guideName: 'Breathing',
                instructions: [
                    { // An Instruction
                        duration: [1, 1, 1, 0],
                    },
                    { // An Instruction
                        duration: [1, 1, 1, 0],
                    },
                ]
            },
            { // A Guide
                guideName: 'RepeatWords',
                instructions: [
                    { // An Instruction
                        duration: [0.5],
                        instructionsText: 'this is NOTHING to me!'
                    },
                    { // An Instruction
                        duration: [0.5],
                        instructionsText: 'this is NOTHING to me!'
                    },
                ]
            },
            { // A Guide
                guideName: 'RepeatWords',
                instructions: [
                    { // An Instruction
                        duration: [0.5],
                        instructionsText: 'another one!'
                    },
                ]
            },
            { // A Guide
                guideName: 'PowerPose',
                instructions: [
                    { // An Instruction
                        duration: [10],
                    }
                ]
            },
        ],
    doubt:
        [ // A Session
            { // A Guide
                guideName: 'PowerPose',
                instructions: [
                    { // An Instruction
                        duration: [10],
                    },
                    {
                        duration: [10],
                    }
                ]
            }
        ],
    motivation:
        [
            { // A Guide
                guideName: 'ClosedEyes',
                instructions: [
                    { // An Instruction
                        duration: [10],
                        instructionsText: 'How can you seize the rest of your day?'
                    },
                ]
            },
            { // A Guide
                guideName: 'RepeatWords',
                instructions: [
                    { // An Instruction
                        duration: [1.5],
                        instructionsText: 'this is NOTHING to me!'
                    },
                    { // An Instruction
                        duration: [1.5],
                        instructionsText: 'this is NOTHING to me!'
                    },
                    { // An Instruction
                        duration: [1.5],
                        instructionsText: 'this is NOTHING to me!'
                    },
                ]
            },
        ],
    inspiration:
        [
            { // A Guide
                guideName: 'OneInstruction',
                instructions: [
                    { // An Instruction
                        instructionsText: 'Stop and think.'
                    },
                ]
            },
            { // A Guide
                guideName: 'OneInstruction',
                instructions: [
                    { // An Instruction
                        instructionsText: 'I should see this.'
                    },
                ]
            },
        ],
    drinkWater:
        [
            { // A Guide
                guideName: 'DrinkWater',
                instructions: [
                    { // An Instruction
                        instructionsText: "If you see this, it's a bug"
                    },
                ]
            },
        ],
};
