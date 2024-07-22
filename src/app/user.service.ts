import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  id?: string;
  name?: string;
  currentMessage= new BehaviorSubject<any>(null)
  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private firestore: AngularFirestore
  ) {
    // this.listenToUserCollectionChanges()
  }
   requestPermission(): void {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log("FCM token received: ", token);
      },
      (error) => {
        console.error("Unable to get permission to notify.", error);
      }
    );
  }


  receiveMessage(): void {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log('new message', payload);
        this.firestore.collection('messages').add({
          ...payload,
          isView: false
        });
        this.currentMessage.next(payload.notification);
        // this.showCustomNotification(payload)

      },
      (error) => {
        console.error('Error receiving message:', error);
      }
    );
  }
showCustomNotification(payload?:any){
  let notify_data = payload?.notification || payload;
  let title = notify_data['title'];
  let options = {
    body: notify_data['body'],
    icon: './assets/notity.png',
  }
  console.log('new message',notify_data);
  let notify:Notification = new Notification(title,options)

  notify.onclick= event=>{
    event.preventDefault();
    window.location.href='http://localhost:4200'
  }


}

  createUser(user: any): Promise<void> {
    const id = this.firestore.createId();
    // this.showCustomNotification({
    //   notification: {
    //     title: 'User Added',
    //     body: `A new user has been added ${user.name}`
    //   }})
    return this.firestore.collection('users').doc(id).set({ ...user, id });
  }

  getUsers(): Observable<any[]> {
    return this.firestore.collection('users').valueChanges();
  }

  updateUser(id: string, user: any): Promise<void> {
    return this.firestore.collection('users').doc(id).update(user);
  }

  deleteUser(user: any): Promise<void> {
    // this.showCustomNotification({
    //   notification: {
    //     title: `User Deleted ${user.name}`,
    //     body: `A user has been Deleted ${user.email}`
    //   }})
    return this.firestore.collection('users').doc(user.id).delete();
  }


  listenToUserCollectionChanges(): void {
    this.firestore.collection('users').stateChanges(['added', 'modified']).subscribe(
      changes => {
        changes.forEach(change => {
          const data = change.payload.doc.data() as {id:string, name: string ,email:string,isView:boolean};
          if (data.isView == true) {
            return;
          }
          if (change.type == 'added') {
            this.showCustomNotification({
              notification: {
                title: `User Added ${data.name}`,
                body: `A new user has been added ${data.email}`
              }
            });
             data.isView=true
            this.firestore.collection('users').doc(data.id).update(data)
          } else if (change.type == 'modified') {
            this.showCustomNotification({
              notification: {
                title: `User Updated ${data.name}`,
                body: `User has been updated ${data.email}`
              }
            });
          }
        });
      },
      error => {
        console.error('Error listening to user collection changes:', error);
      }
    );
  }




}
