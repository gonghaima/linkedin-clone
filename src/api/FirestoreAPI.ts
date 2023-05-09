import { firestore } from '../firebaseConfig';
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  where,
  setDoc,
  deleteDoc,
  orderBy,
} from 'firebase/firestore';
import { toast } from 'react-toastify';

type SET_ALL_STATUS = (arg0: { id: string }[]) => void;

const postsRef = collection(firestore, 'posts');
const userRef = collection(firestore, 'users');
const likeRef = collection(firestore, 'likes');
const commentsRef = collection(firestore, 'comments');
const connectionRef = collection(firestore, 'connections');

export const postStatus = (object: unknown) => {
  console.log('addDoc...');

  addDoc(postsRef, object)
    .then(() => {
      toast.success('Post has been added successfully');
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getStatus = (setAllStatus: SET_ALL_STATUS) => {
  const q = query(postsRef, orderBy('timeStamp'));
  onSnapshot(q, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getAllUsers = (setAllUsers: (arg0: { id: string }[]) => void) => {
  onSnapshot(userRef, (response) => {
    setAllUsers(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getSingleStatus = (setAllStatus: SET_ALL_STATUS, id: string) => {
  const singlePostQuery = query(postsRef, where('userID', '==', id));
  onSnapshot(singlePostQuery, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getSingleUser = (
  setCurrentUser: (arg0: { id: string }) => void,
  email: string
) => {
  const singleUserQuery = query(userRef, where('email', '==', email));
  onSnapshot(singleUserQuery, (response) => {
    setCurrentUser(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })[0]
    );
  });
};

export const postUserData = (object: {
  userID: string;
  name: string;
  email: string;
  imageLink: string;
}) => {
  addDoc(userRef, object)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const getCurrentUser = (
  setCurrentUser: (arg0: { id: string }) => void
) => {
  onSnapshot(userRef, (response) => {
    setCurrentUser(
      response.docs
        .map((docs) => {
          return { email: '', ...docs.data(), id: docs.id };
        })
        .filter((item) => {
          return item.email === localStorage.getItem('userEmail');
        })[0]
    );
  });
};

export const editProfile = (userID: string | undefined, payload: any) => {
  const userToEdit = doc(userRef, userID);

  updateDoc(userToEdit, payload)
    .then(() => {
      toast.success('Profile has been updated successfully');
    })
    .catch((err) => {
      console.log(err);
    });
};

export const likePost = (userId: any, postId: any, liked: any) => {
  try {
    const docToLike = doc(likeRef, `${userId}_${postId}`);
    if (liked) {
      deleteDoc(docToLike);
    } else {
      setDoc(docToLike, { userId, postId });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getLikesByUser = (
  userId: any,
  postId: unknown,
  setLiked: (arg0: boolean) => void,
  setLikesCount: (arg0: number) => void
) => {
  try {
    const likeQuery = query(likeRef, where('postId', '==', postId));

    onSnapshot(likeQuery, (response) => {
      const likes = response.docs.map((doc) => doc.data());
      const likesCount = likes?.length;

      const isLiked = likes.some((like) => like.userId === userId);

      setLikesCount(likesCount);
      setLiked(isLiked);
    });
  } catch (err) {
    console.log(err);
  }
};

export const postComment = (
  postId: any,
  comment: any,
  timeStamp: any,
  name: any
) => {
  try {
    addDoc(commentsRef, {
      postId,
      comment,
      timeStamp,
      name,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getComments = (
  postId: unknown,
  setComments: (arg0: { id: string }[]) => void
) => {
  try {
    const singlePostQuery = query(commentsRef, where('postId', '==', postId));

    onSnapshot(singlePostQuery, (response) => {
      const comments = response.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setComments(comments);
    });
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = (
  id: string | undefined,
  status: any,
  postImage: any
) => {
  const docToUpdate = doc(postsRef, id);
  try {
    updateDoc(docToUpdate, { status, postImage });
    toast.success('Post has been updated!');
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (id: string | undefined) => {
  const docToDelete = doc(postsRef, id);
  try {
    deleteDoc(docToDelete);
    toast.success('Post has been Deleted!');
  } catch (err) {
    console.log(err);
  }
};

export const addConnection = (userId: any, targetId: any) => {
  try {
    const connectionToAdd = doc(connectionRef, `${userId}_${targetId}`);

    setDoc(connectionToAdd, { userId, targetId });

    toast.success('Connection Added!');
  } catch (err) {
    console.log(err);
  }
};

export const getConnections = (
  userId: any,
  targetId: unknown,
  setIsConnected: (arg0: boolean) => void
) => {
  try {
    const connectionsQuery = query(
      connectionRef,
      where('targetId', '==', targetId)
    );

    onSnapshot(connectionsQuery, (response) => {
      const connections = response.docs.map((doc) => doc.data());

      const isConnected = connections.some(
        (connection) => connection.userId === userId
      );

      setIsConnected(isConnected);
    });
  } catch (err) {
    console.log(err);
  }
};
