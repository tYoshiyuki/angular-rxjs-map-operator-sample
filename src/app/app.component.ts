import { HttpClient } from "@angular/common/http";
import { Component, OnInit, VERSION } from "@angular/core";
import { concatMap, mergeMap, switchMap } from "rxjs/operators";

export interface User {
  id: number;
  name: string;
  username: string;
}

export interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.mergeMapSample();
    this.switchMapSample();
    this.concatMapSample();
  }

  mergeMapSample(): void {
    console.log("----- mergeMapのサンプルです -----");
    this.http
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .pipe(
        mergeMap(x => x), // 配列を要素に平坦化
        mergeMap(x => {
          console.log("mergeMap 投入されました -> " + x.id + " -> " + x.name);
          return this.http.get<Posts[]>(
            `https://jsonplaceholder.typicode.com/posts?userId=${x.id}`
          );
        })
      )
      .subscribe(x =>
        console.log(
          "mergeMap 処理完了しました -> " + x[0].userId + " -> " + x[0].title
        )
      );
  }

  switchMapSample(): void {
    console.log("----- switchMapのサンプルです -----");
    this.http
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .pipe(
        mergeMap(x => x), // 配列を要素に平坦化
        switchMap(x => {
          console.log("switchMap 投入されました -> " + x.id + " -> " + x.name);
          return this.http.get<Posts[]>(
            `https://jsonplaceholder.typicode.com/posts?userId=${x.id}`
          );
        })
      )
      .subscribe(x =>
        console.log(
          "switchMap 処理完了しました -> " + x[0].userId + " -> " + x[0].title
        )
      );
  }

  concatMapSample(): void {
    console.log("----- concatMapのサンプルです -----");
    this.http
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .pipe(
        mergeMap(x => x), // 配列を要素に平坦化
        concatMap(x => {
          console.log("concatMap 投入されました -> " + x.id + " -> " + x.name);
          return this.http.get<Posts[]>(
            `https://jsonplaceholder.typicode.com/posts?userId=${x.id}`
          );
        })
      )
      .subscribe(x =>
        console.log(
          "concatMap 処理完了しました -> " + x[0].userId + " -> " + x[0].title
        )
      );
  }
}
