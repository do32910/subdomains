import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../../models/Post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  post: Post;
  @Output() newPost: EventEmitter<Post> = new EventEmitter();

  constructor(private postService: PostService) { }
  ip_address:string;
  id_user:number;
  purchase_date:String;
  expiration_date:string;

  ngOnInit() {
    this.ip_address = "00.000.00.00";
    this.id_user = 3;
    this.purchase_date = "2018-06-27";
    this.expiration_date = "2019-06-27";
  }


  addPost(id_user, name, at, ip_address, purchase_date, expiration_date) {

    console.log(name, at);
    if(!name || !at){
      alert("please add post");
    }else{
      this.postService.savePost({id_user, name, at, ip_address, purchase_date, expiration_date} as Post).subscribe(post => {this.newPost.emit(post);});
    }
  }

}
