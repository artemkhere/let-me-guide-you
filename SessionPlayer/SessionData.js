export default {
    toughMoment:
        [ // A Session
            { // A Guide
                guideName: 'Breathing',
                instructions: [
                    { // An Instruction
                        duration: [1, 0, 1, 0],
                    },
                    // {
                    //     duration: [4, 2, 4, 2],
                    // },
                    // {
                    //     duration: [4, 2, 4, 2],
                    // },
                ]
            },
        ],
    doubt:
        [ // A Session
            { // A Guide
                guideName: 'PowerPose',
                instructions: [
                    { // An Instruction
                        duration: [15],
                    },
                    {
                        duration: [20],
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
