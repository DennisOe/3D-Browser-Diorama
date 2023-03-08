import bpy

"""This module holds all scripts to automate the workflow between Blender and Babylon.js"""

def export(exp_data: dict[str, str]) -> None:
    """Export files from Blender"""
    if "gltf" in exp_data["type"]:
        bpy.ops.export_scene.gltf(filepath=exp_data["path"],
                                  use_visible=True)

export(dict(type="gltf",
            path=bpy.data.filepath.split("blender")[0] + "diorama.glb"))
