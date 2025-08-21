<?php
namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;

class UserPostMovie extends Controller
{
    public function post(Request $request)
    {
        $request->validate([
            'user_id' => 'required | numeric',
            'name'    => 'required|string',
            'desc'    => 'required|string',
        ]);

        // $post = Post::create([
        // 'name' => $request->name,
        // 'desc' => $request->desc,
        //     'user_id' => $request->user_id
        // ]);
        $id   = $request->user_id;
        $user = User::find($id);

        $posts = $user->posts()->create([
            'name' => $request->name,
            'desc' => $request->desc,
        ]);

        return response()->json(['message' => 'Post added successfully', 'posts' => $posts]);
    }

    public function posts($id)
    {
        $post = Post::where('user_id', '=', $id)->get();

        return response()->json(['post' => $post]);
    }

    public function removePost($id)
    {
        $post = Post::find($id);

        $post->delete();

        return response()->json(['message' => "Post deleted successfully"]);
    }

    public function movie(Request $request)
    {
        $request->validate([
            'name'    => 'required | string',
            'desc'    => 'required | string',
            'ratings' => 'required | numeric',
            'id'      => 'required | numeric',
        ]);

        $id = $request->id;

        $user = User::find($id);

        // $movie = $user->movies()->create([
        // 'name' => $request->name,
        // 'desc' => $request->desc
        // ]);

        $movie = Movie::create([
            'name' => $request->name,
            'desc' => $request->desc,
            'user_id' => $user->id,
        ]);

        $user->movies()->attach($movie->id, [
            'ratings' => $request->ratings,
        ]);

        return response()->json(['message' => 'Movie Added Successfully']);
    }

    public function movies()
    {
        $user = User::with('movies')->get();

        return response()->json(['allData', $user]);
    }

    public function userMovie($id){
        $user = User::find($id);

        $movies = $user->movies()->get();

        return response()->json(['movies' => $movies]);
    }

    public function delMovie(Request $request, $id){
        $user = User::find($request->id);

        $movie = Movie::find($id);

        $user->movies()->detach($id);

        $movie->delete();

        return response()->json(['message', 'deleted successfully', 'movie' => $movie]);
    }

    public function queryTest(){
    //     $query = User::query()->where("name", "test1");

    //     $user = $query->get();

        $name = request("test");


    //     return response()->json(['dt' => $user, "test" => $name]);
    
    $user = User::find(1)
              ->rightJoin('posts', 'users.id', '=', 'posts.user_id')
            //   ->join('posts', 'users.id', '=', 'posts.user_id')
            //   ->join('movies', 'users.id', '=', 'movie_user.user_id')
            //   ->select('users.*', 'posts.name as postName')
            ->select('users.*', 'posts.name as postName','posts.desc')
              ->get();

       return response()->json(['dt' => $user, "test" => $name]);       
     }          
}
