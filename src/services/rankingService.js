class RankingService {
  constructor() {
    // Mock UCI rankings data - this would be replaced with actual API calls
    this.mensRankings = [
      {
        position: 1,
        rider: "Tadej Pogačar",
        team: "UAE Team Emirates",
        points: 1250,
        nationality: "SLO"
      },
      {
        position: 2,
        rider: "Jonas Vingegaard",
        team: "Jumbo-Visma",
        points: 1180,
        nationality: "DEN"
      },
      {
        position: 3,
        rider: "Bauke Mollema",
        team: "Israel-Premier Tech",
        points: 1020,
        nationality: "NED"
      }
    ];

    this.womensRankings = [
      {
        position: 1,
        rider: "Anna van der Breggen",
        team: "Team SD Worx",
        points: 980,
        nationality: "NED"
      },
      {
        position: 2,
        rider: "Lotte Kopecky",
        team: "Boels-Dolmans",
        points: 920,
        nationality: "BEL"
      },
      {
        position: 3,
        rider: "Sharon Laws",
        team: "Team DSM",
        points: 870,
        nationality: "GBR"
      }
    ];

    this.teamRankings = [
      {
        position: 1,
        team: "UAE Team Emirates",
        points: 2450,
        nationality: "UAE"
      },
      {
        position: 2,
        team: "Jumbo-Visma",
        points: 2360,
        nationality: "NED"
      },
      {
        position: 3,
        team: "Israel-Premier Tech",
        points: 2040,
        nationality: "FRA"
      }
    ];
  }

  /**
   * Get men's UCI rankings
   */
  getMensRankings() {
    return this.mensRankings;
  }

  /**
   * Get women's UCI rankings
   */
  getWomensRankings() {
    return this.womensRankings;
  }

  /**
   * Get team rankings
   */
  getTeamRankings() {
    return this.teamRankings;
  }

  /**
   * Get specific rider ranking
   */
  getRiderRanking(riderName) {
    const mensRider = this.mensRankings.find(rider => rider.rider === riderName);
    const womensRider = this.womensRankings.find(rider => rider.rider === riderName);

    return mensRider || womensRider || null;
  }

  /**
   * Get specific team ranking
   */
  getTeamRanking(teamName) {
    return this.teamRankings.find(team => team.team === teamName) || null;
  }
}

module.exports = new RankingService();