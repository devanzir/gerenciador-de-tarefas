<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;

class TaskController extends Controller
{
    public function index()
    {
        return TaskResource::collection(Task::all());
    }

    public function store(StoreTaskRequest $request)
    {
        $task = Task::create($request->validated());
        return new TaskResource($task);
    }

    public function show($id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Tarefa não encontrada.'], 404);
        }

        return new TaskResource($task);
    }

    public function update(UpdateTaskRequest $request, $id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Tarefa não encontrada.'], 404);
        }

        $task->update($request->validated());
        return new TaskResource($task);
    }

    public function destroy($id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Tarefa não encontrada.'], 404);
        }

        $task->delete();
        return response()->noContent();
    }
}
