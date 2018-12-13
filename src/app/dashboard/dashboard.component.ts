import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { InvestmentsService } from 'src/services/investments.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public showForm = false;

  public amount;

  constructor(
    private user: UserService,
    private investment: InvestmentsService
  ) {}

  ngOnInit() {}

  toggleForm() {
    this.showForm = !this.showForm;
  }

  invest() {
    const user = this.user.getUser();
    const token = user.token;

    this.investment.newInvestment({

    }, token).then((resp) => {
      console.log(resp);
    }).catch((error) => {
      console.log(error);
    });
  }
}
