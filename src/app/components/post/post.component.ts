import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/Post'
import { PostService } from '../../services/post.service'
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: Post[];
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts().subscribe(posts => {
      console.log(posts);
      this.posts = posts;
    });
  }

  onNewPost(post: Post){
    this.posts.unshift(post);
  }

}
