class ElectionMapService {

    constructor() {
        this.electionMappings = {
            'PARLIAMENT': new Map([
                ['path3408', 1],
                ['path3725', 2],
                ['path3393', 3],
                ['path3617', 4],
                ['path3712', 5],
                ['path3428', 6],
                ['path3507', 7],
                ['path3465', 8],
                ['path3626', 9],
                ['path3557', 10],
                ['path3525', 11],
                ['path3555', 12],
                ['path3510', 13],
                ['path3608', 14],
                ['path3580', 15],
                ['path4350', 16],
                ['path3614', 17],
                ['path3479', 18],
                ['path4250', 19],
                ['path4296', 20],
                ['path3453', 21],
                ['path3407', 22],
                ['path3444', 23],
                ['path3840', 24],
                ['path3498', 25],
                ['path3464', 26],
                ['path3929', 27],
                ['path3913', 28],
                ['path3436', 29],
                ['path4429', 30],
                ['path4467', 31],
                ['path3396', 32],
                ['path3653', 33],
                ['path3488', 34],
                ['path3532', 35],
                ['path3487', 36],
                ['path3529', 37],
                ['path3486', 38],
                ['path3506', 39],
                ['path4412', 40],
                ['path4387', 41]
            ])
        };
    }

    getDistrictIdsForElections(electionsType) {
        return this.electionMappings[electionsType];
    }

    getDistrictIdForElections(id, electionsType) {
        return this.electionMappings[electionsType].get(id);
    }

    static factory() {
        ElectionMapService.instance = new ElectionMapService();
        return ElectionMapService.instance;
    }
}

export default ElectionMapService;