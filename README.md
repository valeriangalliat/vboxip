SSHBox for Microsoft Windows
============================

Please refer to the `master` branch documentation for generic documentation.

Dependencies
------------

This software is written in [JScript .NET](http://en.wikipedia.org/wiki/JScript_.NET)
and therefore requires the .NET framework to be installed and the Microsoft
JScript .NET compiler available.

Obviously VirtualBox needs to be installed, and the `VBoxManage.exe` file must
be present in `\Program Files\Oracle\VirtualBox`.

[PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/) is required to
handle the SSH connections. The program will search for the putty executable
in different locations in this order:

1. the current working directory,
1. the executable directory,
1. the `PATH` environment variable.

Compilation
---------------

You can compile the executable with Microsoft JScript .NET compiler.

A generic compilation command is provided in `build.bat` but you may want to
adapt it with your actual Microsoft .NET version and location.
