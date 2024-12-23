import { Component } from '@angular/core';
import {Episode} from '../../entities/Episode';
import {EpisodeService} from '../../services/episode/episode.service';
import {ActivatedRoute} from '@angular/router';
import {PostEditorComponent} from '../../components/post-editor/post-editor.component';

@Component({
  selector: 'app-episode',
  imports: [
    PostEditorComponent
  ],
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.css'
})
export class EpisodeComponent {
  episode: Episode|null = null;

  constructor(private episodeService: EpisodeService,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.episode = this.episodeService.getEpisode(id);
  }
}
