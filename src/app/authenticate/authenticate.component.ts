import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../_core/authentication.service';

@Component({
  moduleId: module.id,
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss'],
  providers:[AuthenticationService]
})
export class AuthenticateComponent implements OnInit {
  registered = true;
  model: any = {};

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if(this.auth.isLogged()){
      this.router.navigate(['/']);
    }
  }
  toggle() :void{
    this.registered ? this.registered = false : this.registered = true
  }

  register(f: NgForm) :void{
    this.auth.register(f.value)
    .subscribe( () => {
        // set success message and pass true paramater to persist the message after redirecting to the login page
        // this.router.navigate([this.return_url]);
        this.router.navigate(['/']);
      },
      error => {
         this.router.navigate(['/authenticate']);
    });
  }

  authenticate(f: NgForm) :void{
    this.auth.login(f.value)
    .subscribe( () => {
        // set success message and pass true paramater to persist the message after redirecting to the login page
        // this.router.navigate([this.return_url]);
        this.router.navigate(['/']);
      },
      error => {
         this.router.navigate(['/authenticate']);
    });
  }
}
