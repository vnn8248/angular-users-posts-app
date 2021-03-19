import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Post } from '../../models/Post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  @Output() newPost: EventEmitter<Post> = new EventEmitter();
  @Output() updatedPost: EventEmitter<Post> = new EventEmitter();
  @Input() currentPost: Post = {
    id: 0,
    title: '',
    body: ''
  };
  @Input() isEdit: boolean = false;

  constructor(private postService: PostService) { };

  ngOnInit(): void {
  };

  addPost(title: any, body: any) {
    if (!title || !body) {
      alert("Please add both title and body");
    } else {
      this.postService.savePost({ title, body } as Post).subscribe(post => {
        this.newPost.emit(post);
      });
    };
  };

  updatePost() {
    this.postService.updatePost(this.currentPost).subscribe(post => {
      console.log(post);
      this.isEdit = false;
      this.updatedPost.emit(post);
    });
  };

}
