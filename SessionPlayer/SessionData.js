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
            { // A Guide
                guideName: 'OneInstruction',
                instructions: [
                    { // An Instruction
                        instructionsText: 'Think of how you are going to seize the rest of your day.'
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
        ]
};
