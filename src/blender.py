import bpy

"""This module holds all scripts to automate the workflow between Blender and Babylon.js"""

def export(exp_data: dict[str, str]) -> None:
    """Export files from Blender"""
    if "gltf" in exp_data["type"]:
        bpy.ops.export_scene.gltf(filepath=exp_data["path"],
                                  use_visible=True)


bpy.ops.wm.save_mainfile()
for each_object in bpy.data.objects:
    if "MESH" in each_object.type:
        bpy.context.view_layer.objects.active = each_object
        [bpy.ops.object.modifier_apply(modifier=modifire.name) for modifire in each_object.modifiers]

export(dict(type="gltf",
            path=bpy.data.filepath.split("blender")[0] + "diorama.glb"))