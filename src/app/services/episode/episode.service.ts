import { Injectable } from '@angular/core';
import {Episode} from '../../entities/Episode';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  constructor() { }

  getEpisodes(game_id: number, page: number): Episode[] {
    let title = "Episode on page "+page;
      return [
        {
          "id": 1,
          "title": title,
          "status": "active",
          "is_my_episode": true,
          "gameId": 1,
          "totalPostCount": 47,
          "lastPostDate": "2024-12-11 12:12:12",
          "lastPostCharacterName": "Antilia",
          "description": "If you have not been to Abriymoch, you have waisted your eternal life.",
          "image": "https://i.imgur.com/ODvKkP3.jpg",
          "characters": [{
            "id": 1,
            "name": "Raphael",
            "is_mine": true,
            "avatar": "https://forumavatars.ru/img/avatars/0019/41/ed/2188-1730347409.png"
          },
            {
              "id": 2,
              "name": "Antillia",
              "is_mine": false,
              "avatar": "https://forumavatars.ru/img/avatars/0019/41/ed/2202-1730347597.png"
            }],
          "posts": []
        },
      ]
    }

    getEpisode(episode_id: number): Episode {
      return {
          "id": 1,
          "title": "The City of Sin",
          "status": "active",
          "is_my_episode": true,
          "gameId": 1,
          "totalPostCount": 47,
          "lastPostDate": "2024-12-11 12:12:12",
          "lastPostCharacterName": "Antilia",
          "description": "If you have not been to Abriymoch, you have waisted your eternal life.",
          "image": "https://i.imgur.com/ODvKkP3.jpg",
          "characters": [{
            "id": 1,
            "name": "Raphael",
            "is_mine": true,
            "avatar": "https://forumavatars.ru/img/avatars/0019/41/ed/2188-1730347409.png"
          },
            {
              "id": 2,
              "name": "Antillia",
              "is_mine": false,
              "avatar": "https://forumavatars.ru/img/avatars/0019/41/ed/2202-1730347597.png"
            }],
          "posts": [
            {
              "id": 1,
              "episodeId": 1,
              isRead: true,
              postDate: "2024-12-11 12:12:12",
              character: {
                "id": 1,
                "name": "Raphael",
                "is_mine": true,
                "avatar": "https://forumavatars.ru/img/avatars/0019/41/ed/2188-1730347409.png"
              },
              content: "Ask any devil who spent enough time in the mortal planes what is one thing that attracts them the most, and they will answer you without a trace of hesitation: cities. The bustling cities, full of people, full of desperate hopes and desperate struggles, awash with sin, brimming with misery. Ripe for a devil to harvest. Raphael always imagined that one day, when he would have his own house, he would keep there a portal to every big city of mortals, and thus he would never again have to worry about meeting his rather high quota, even less so about going hungry.\n" +
                "Alas, for now, it was still a fantasy. Or rather a plan, because he had already set in motion a beautiful scheme, ready to bear fruit mere centuries from now. He was almost there. All he had to do now was wait and keep with his day-to-day life, which had been quite pleasant for the last thousand years.\n" +
                "After leaving Cania – surprisingly, without his tail being ripped off – Raphael had settled in Phlegethos. At first, he lived like most unfortunate fiends here, in a cave near a small lava pool, but pretty quickly he scraped some soul coins to spare and could afford himself a room in a tavern in Abriymoch. He had been living here ever since: from a small room, he had eventually moved to a nice, spacious loft above a court clerks’ archive, and turned it in time into a real home: with a cabinet, a treasure room, a living room to entertain the guests, a well-protected bedroom, and the largest bathtub he could manage to fit in the remaining space. It was always filled with icy-cold water. The loft even had a small balcony which Raphael used as a porch. Coming and going via the balcony saved him the necessity to go down and walk past the grim, greyish faces of the clerks. Raphael could never tell whether they were like that because of their work or they were simply made this way, with their lips forever curving down over protruding fangs. Either way, their faces always spoiled the mood for him, so he preferred not to go downstairs. There was no need anyway.\n" +
                "Raphael walked on the balcony and, for the million’s time, took in the view: the building where he lived, although not very tall, stood quite high on a slope of the volcano, so he could see the whole city. Right underneath his feet was the largest of two islands rising from the lava lake. It belonged to clerks, judges, endless weapon and craftsman shops and, of course, the police. To the right, the island narrowed and ended with the magnificent building of Diabolical courts. Next to it, father to the right, the manor of the city governor, Gazra, rose straight from the lava.\n" +
                "Raphael had met Gazra several times and had not been particularly impressed. Duke Chamo, on the other hand, the city’s chief of economy, had made a great impression on the young cambion. It was because of him that Raphael had eventually decided to let his human form age, and later had modeled his human version after him even further, into a charming, calm (by devilish standards), wise and a little smug aristocrat. It worked perfectly.\n" +
                "To the left, the crater was filled with lava, but it did not bother much the occupants of the steelworks. The had erected their factories and smelters right in the middle of the lake and used the heat of the melted lava to feed their furnaces. They were not the only ones: buildings were rising from the lake everywhere, like giant teeth piercing a glowing red piece of demon flesh. It was a rather poetic way to look at the city, and many artists had depicted it as such.\n" +
                "Still farther on the opposite side of the crater, there stood another island, somewhat smaller in size, but lit up with magical flames of every possible color. It was the glowing window case of the city, the district of the most expensive torture houses, slave auctions, taverns, theatres, art and artefact galleries and music halls. The wealthy and the noble there could partake in all the vices which were considered civilized and worthy among devils. But even further still, in the rim of the crater itself, lay the real beating heart of this place: cheap taverns, gambling houses, dance floors, brothels and much more. Every cave in the endless labyrinth of halls wormed through the outer wall of the crater held a sin unimaginable, a lunatic supreme with a menagerie of beasts from all over the planes, a trader willing to sell contraband from the mount Celestia itself or a decent trader selling goods from the mortal world.\n" +
                "Raphael was such a trader. He had been spending so much time in the mortal worlds that he had amassed a fortune befitting a prince or maybe a ruler of a wealthy dukedom. He had lands, he had servants, he had herds of cattle and vineries. And those things were much more useful for a devil than one might to think. For his job was to look like he could give his clients everything and anything, as if not just gold, and jewels, and forbidden books, but also the most delicious meals and the most exquisite vines were just lying somewhere already, only waiting for Raphael to click his fingers and bring them before another starved misadventurer. And, in fact, they were.\n" +
                "Not all devils were as thoughtful as him, and so it had become a habit for many of them, before going to seduce another soul, to pay Raphael a visit and ask if they could borrow a bottle of vine or a fine dress to make an impression. Raphael never refused, of course. He was earning a small percentage of the prize, but, most importantly, through the little favors like these he was earning a reputation. Someone, he had heard, had been already calling him “the fiend savior”. Raphael rather liked it.\n" +
                "He stretched his wings and took to the sky. He could turn around and fly to the nearest entrance into the rim maze, but then he would have to climb and zigzag for a good hour. Instead, he crossed the bowl of the crater and landed on a balcony crudely carved out of the black obsidian and filled with tables. It was a balcony of a tavern he knew well: the owner owed him quite a lot for the peculiar sort of human-meat sausages only Raphael knew where to get. Alas, cannibal tribes were now hard to come by even for devils.\n" +
                "Raphael walked through the rows of tables into the main cave, saluted the spinagon servant and stopped abruptly. A sense of déjà vu overwhelmed him: at one of the side tables, cozily tucked in a small whole in the wall, sat a young female cambion with large, gently glowing eyes. She was fiddling with a flute. Raphael chuckled and walked straight to her.\n" +
                "“My, my, this is a small universe. Forgive me, my lady, but you look like a woman of culture. Are you waiting for someone, or may I join you?” He had already wrapped his tail around a leg of a chair and dragged it out from under the table.\n" +
                "He was curious to know how the girl had gotten here. And a little concerned that she could have told something unfortunate to someone, although, realistically, he had nothing to worry about. Altilia’s little misfortune could not lead back to him: first, he had sent her on her own to the Tyr’s temple, so anything she had done there would be solely on her. And then, when she had run back to him with her horns trembling, she had mumbled some story about the priests and their god, and Raphael had pretended he had believed her. Still, better safe than thrown into the Flame Pit for five centuries."
            }
          ]
        }
    }
}
