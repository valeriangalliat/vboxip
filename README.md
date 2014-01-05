SSHBox for Microsoft Windows
============================

Please refer to the `master` branch documentation for generic documentation.

Dependencies
------------

This software is written in [JScript .NET](http://en.wikipedia.org/wiki/JScript_.NET)
and therefore requires the .NET framework to be installed and the Microsoft
JScript .NET compiler available.

Obviously VirtualBox needs to be installed, and the `VBoxManage.exe` file must
be present.

[PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/) is required to
handle the SSH connections.

Configuration
-------------

You can configure the `VBoxManage.exe` and `putty.exe` paths in a `sshbox.txt`
file next to the executable (like the one in `bin` directory). This file is
self-explanatory.

The example file has got the default values (look in current directory or
`PATH`) but you can specify the absolute path to the executables.

If no configuration file is present, the executables are looked in `PATH`.

Compilation
-----------

You can compile the executable with Microsoft JScript .NET compiler.

A generic compilation command is provided in `build.bat` but you may want to
adapt it with your actual Microsoft .NET version and location.
