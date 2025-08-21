<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class VariationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
          DB::table('variations')->insert([
            [ 'id' => 1, 'uuid' => '3ba01bb3-e8be-458e-9030-0f05974a1984', 'name' => '1seater white leather sofa', 'classname' => 'variation Seater whiteLeatherSofa vari-1seater active-seater', 'textData' => '1seater', 'imgUrl' => '1seater white-sofa.png', 'priceV' => 299, 'colorData1' => '', 'productsId' => 1, 'created_at' => '2025-05-16 03:02:31', 'updated_at' => '2025-05-16 03:02:31' ],
            [ 'id' => 2, 'uuid' => '30200b18-5698-4c85-90a8-c86e2eb5e9b8', 'name' => '3seater white leather sofa', 'classname' => 'variation Seater whiteLeatherSofa vari-3seater', 'textData' => '3seater', 'imgUrl' => '3seater white-sofa.png', 'priceV' => 399, 'colorData1' => '', 'productsId' => 10, 'created_at' => '2025-05-16 03:02:31', 'updated_at' => '2025-05-16 03:02:31' ],
            [ 'id' => 3, 'uuid' => 'c4b456ec-03e0-4d65-973e-a519b919eebf', 'name' => 'red wing chair', 'classname' => 'variation color wingChair color-red', 'textData' => '', 'imgUrl' => 'red wing chair.png', 'priceV' => NULL, 'colorData1' => 'red', 'productsId' => 2, 'created_at' => '2025-05-16 03:02:31', 'updated_at' => '2025-05-16 03:02:31' ],
            [ 'id' => 4, 'uuid' => 'd3000927-1338-4073-b460-51d1abb1e5b2', 'name' => 'yellow wing chair', 'classname' => 'variation color wingChair color-yellow', 'textData' => '', 'imgUrl' => 'yellow wing chair.png', 'priceV' => NULL, 'colorData1' => 'yellow', 'productsId' => 11, 'created_at' => '2025-05-16 03:02:31', 'updated_at' => '2025-05-16 03:02:31' ],
            [ 'id' => 5, 'uuid' => 'd923be42-9e34-4209-99b2-a0bb610c6e04', 'name' => 'blue wing chair', 'classname' => 'variation color wingChair color-blue', 'textData' => '', 'imgUrl' => 'blue wing chair.png', 'priceV' => NULL, 'colorData1' => 'blue', 'productsId' => 12, 'created_at' => '2025-05-16 03:02:31', 'updated_at' => '2025-05-16 03:02:31' ],
            [ 'id' => 6, 'uuid' => '52e0ca44-8a3c-4867-aa01-4aa93dc18f12', 'name' => '2seater brown sofa', 'classname' => 'variation Seater whiteLeatherSofa vari-3seater', 'textData' => '2seater', 'imgUrl' => '2seater brown sofa.png', 'priceV' => 300, 'colorData1' => '', 'productsId' => 3, 'created_at' => '2025-05-16 03:02:31', 'updated_at' => '2025-05-16 03:02:31' ],
            [ 'id' => 7, 'uuid' => '6def8f0c-a0db-480d-b7f2-4ef7c10f53d3', 'name' => '1seater brown sofa', 'classname' => 'variation Seater brownSofa vari-1seater', 'textData' => '1seater', 'imgUrl' => '1seater brown sofa.png', 'priceV' => 200, 'colorData1' => '', 'productsId' => 13, 'created_at' => '2025-05-16 03:02:31', 'updated_at' => '2025-05-16 03:02:31' ],
            [ 'id' => 8, 'uuid' => '8478d763-5bd7-4c6c-8b79-480dc98a2fdf', 'name' => 'black cushion', 'classname' => 'variation color cushion color-black', 'textData' => '', 'imgUrl' => 'black cushion.png', 'priceV' => NULL, 'colorData1' => 'black', 'productsId' => 4, 'created_at' => '2025-05-16 03:02:31', 'updated_at' => '2025-05-16 03:02:31' ],
            [ 'id' => 9, 'uuid' => '618c4184-b0f5-4bd6-b64c-af484361c34b', 'name' => 'green cushion', 'classname' => 'variation color cushion color-green', 'textData' => '', 'imgUrl' => 'green cushion.png', 'priceV' => NULL, 'colorData1' => 'green', 'productsId' => 14, 'created_at' => '2025-05-16 03:02:31', 'updated_at' => '2025-05-16 03:02:31' ],
            [ 'id' => 10, 'uuid' => '38cff210-714a-4ec2-bf72-5471f3d237e2', 'name' => 'gray cushion', 'classname' => 'variation color cushion color-gray', 'textData' => '', 'imgUrl' => 'gray cushion.png', 'priceV' => NULL, 'colorData1' => 'gray', 'productsId' => 15, 'created_at' => '2025-05-16 03:02:31', 'updated_at' => '2025-05-16 03:02:31' ],
            [ 'id' => 11, 'uuid' => '31df1924-a114-44de-846f-be6e35393dc7', 'name' => 'purple Sofa 3seater', 'classname' => 'variation Seater purpleSofa vari-3seater active-seater', 'textData' => '3seater', 'imgUrl' => '3seater purple sofa.png', 'priceV' => 300, 'colorData1' => '', 'productsId' => 5, 'created_at' => '2025-05-16 03:02:31', 'updated_at' => '2025-05-16 03:02:31' ],
            [ 'id' => 12, 'uuid' => '499dc72a-6d53-4000-b531-b07d5879126a', 'name' => 'purple Sofa 1seater', 'classname' => 'variation Seater purpleSofa vari-1seater', 'textData' => '1seater', 'imgUrl' => '1seater purple sofa.png', 'priceV' => 400, 'colorData1' => '', 'productsId' => 16, 'created_at' => '2025-05-16 03:02:31', 'updated_at' => '2025-05-16 03:02:31' ],
            [ 'id' => 13, 'uuid' => '728822db-8af2-41a1-bc2b-04fa4d20752d', 'name' => 'Circle wooden table', 'classname' => 'variation Shape woodTable vari-Circle active-shape', 'textData' => 'Circle', 'imgUrl' => 'Circle wooden table.png', 'priceV' => 150, 'colorData1' => '', 'productsId' => 6, 'created_at' => '2025-05-16 03:02:31', 'updated_at' => '2025-05-16 03:02:31' ],
            [ 'id' => 14, 'uuid' => 'c5c1b6e5-69de-48be-8e89-c501597380b0', 'name' => 'rectangle wooden table', 'classname' => 'variation Shape woodTable vari-rectangle', 'textData' => 'rectangle', 'imgUrl' => 'rectangle wooden table.png', 'priceV' => 250, 'colorData1' => '', 'productsId' => 17, 'created_at' => '2025-05-16 03:02:31', 'updated_at' => '2025-05-16 03:02:31' ],
            [ 'id' => 15, 'uuid' => 'e165a6aa-aed3-46f5-a332-93bfb0a9dc38', 'name' => 'Oval wooden table', 'classname' => 'variation Shape woodTable vari-Oval', 'textData' => 'Oval', 'imgUrl' => 'Oval wooden table.png', 'priceV' => 350, 'colorData1' => '', 'productsId' => 18, 'created_at' => '2025-05-16 03:02:31', 'updated_at' => '2025-05-16 03:02:31' ],
            [ 'id' => 16, 'uuid' => '2107eb53-a8e4-4639-9cee-fd9df35d6cee', 'name' => 'Oval Glass table', 'classname' => 'variation Shape glassTable vari-Oval active-shape', 'textData' => 'Oval', 'imgUrl' => 'Oval Glass table.png', 'priceV' => 180, 'colorData1' => '', 'productsId' => 7, 'created_at' => '2025-05-16 03:02:31', 'updated_at' => '2025-05-16 03:02:31' ],
            [ 'id' => 17, 'uuid' => 'b9849300-5378-4235-9179-acb7a9587828', 'name' => 'Square Glass table', 'classname' => 'variation Shape glassTable vari-Square', 'textData' => 'Square', 'imgUrl' => 'Square Glass table.png', 'priceV' => 280, 'colorData1' => '', 'productsId' => 19, 'created_at' => '2025-05-16 03:02:31', 'updated_at' => '2025-05-16 03:02:31' ],
            [ 'id' => 18, 'uuid' => 'df350f59-1e77-44c3-81d7-15628959994c', 'name' => '(30X40) bed', 'classname' => 'variation Dimensions Bed dim-30X40 active-bed', 'textData' => '30X40', 'imgUrl' => '(30X40) bed.png', 'priceV' => 180, 'colorData1' => '', 'productsId' => 8, 'created_at' => '2025-05-16 03:02:31', 'updated_at' => '2025-05-16 03:02:31' ],
            [ 'id' => 19, 'uuid' => 'e1575857-b46f-4616-9081-b16238580b69', 'name' => '(50X40) bed', 'classname' => 'variation Dimensions Bed dim-50X40', 'textData' => '50X40', 'imgUrl' => '(50X40) bed.png', 'priceV' => 280, 'colorData1' => '', 'productsId' => 20, 'created_at' => '2025-05-16 03:02:31', 'updated_at' => '2025-05-16 03:02:31' ],
            [ 'id' => 20, 'uuid' => '11bdd625-84c9-4a7b-ad8a-65d8065a8738', 'name' => 'black futon', 'classname' => 'variation color cushion color-black', 'textData' => '', 'imgUrl' => 'black futon.png', 'priceV' => NULL, 'colorData1' => 'black', 'productsId' => 9, 'created_at' => '2025-05-16 03:02:31', 'updated_at' => '2025-05-16 03:02:31' ],
            [ 'id' => 21, 'uuid' => '3693ce52-4b39-4233-bab1-a600007731bb', 'name' => 'red futon', 'classname' => 'variation color cushion color-red', 'textData' => '', 'imgUrl' => 'red futon.png', 'priceV' => NULL, 'colorData1' => 'red', 'productsId' => 21, 'created_at' => '2025-05-16 03:02:31', 'updated_at' => '2025-05-16 03:02:31' ]
        ]);
    }
}
