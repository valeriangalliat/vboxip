import System;
import System.IO;
import System.Windows.Forms;
import IWshRuntimeLibrary;

function parseArgs(args) {
  if (args.length < 5) {
    throw 'Not enough arguments.';
  }

  var user = args[1];
  var name = args[2];
  var num = args[3];
  var proxy = args.slice(4);

  if (!/^0|1|2|3$/.test(num)) {
    throw 'The interface number must be between 0 and 3 (included).';
  }

  num = +num;

  return {user: user, name: name, num: num, proxy: proxy};
}

function parseConfig(name) {
  var config = {
    VBoxManage: 'VBoxManage.exe',
    putty: 'putty.exe'
  };

  name = AppDomain.CurrentDomain.BaseDirectory + '\\' + name;

  if (!File.Exists(name)) {
    // No config file
    return config;
  }

  var lines = File.ReadAllLines(name);

  for (var i = 0; i < lines.length; i++) {
    var parts = lines[i].split('=', 2);

    if (parts.length !== 2) {
      // Line is not valid
      continue;
    }

    if (!(parts[0] in config)) {
      // Key is not valid
      continue;
    }

    config[parts[0]] = parts[1];
  }

  return config;
}

function parseProxy(args, replace) {
  var proxy = [];

  for (var i = 0; i < args.length; i++) {
    var arg = args[i];

    for (var j in replace) {
      arg = arg.replace(j, replace[j]);
    }

    proxy.push(arg);
  }

  return proxy;
}

function argsToString(args) {
  for (var i = 0; i < args.length; i++) {
    args[i] = '"' + args[i].replace('"', '""') + '"';
  }

  return args.join(' ');
}

function tryStartProcess(process) {
  try {
    process.Start();
  } catch (e) {
    if ('' + e === 'Error: The system cannot find the file specified') {
      throw 'Unable to find \'' + process.StartInfo.FileName + '\'.';
    }

    throw e;
  }
}

function invoke(program, args) {
  var process = new System.Diagnostics.Process();
  process.StartInfo.CreateNoWindow = true;
  process.StartInfo.UseShellExecute = false;
  process.StartInfo.RedirectStandardOutput = true;
  process.StartInfo.RedirectStandardError = true;
  process.StartInfo.FileName = program;
  process.StartInfo.Arguments = argsToString(args);
  tryStartProcess(process);
  process.WaitForExit();

  if (process.ExitCode !== 0) {
    throw process.StandardError.ReadToEnd();
  }

  return process.StandardOutput.ReadToEnd();;
}

function start(program, args) {
  var process = new System.Diagnostics.Process();
  process.StartInfo.FileName = program;
  process.StartInfo.Arguments = argsToString(args);
  tryStartProcess(process);
}

function trim(str) {
  return str.replace(/^\s+/, '').replace(/\s+$/, '');
}

function merge(objects) {
  var object = {};

  for (var i = 0; i < objects.length; i++) {
    for (var j in objects[i]) {
      object[j] = objects[i][j];
    }
  }

  return object;
}

function getBoxIp(manage, name, num) {
  var output = null;

  try {
    output = invoke(manage, [
      'guestproperty',
      'get',
      name,
      '/VirtualBox/GuestInfo/Net/' + num + '/V4/IP'
    ]);
  } catch (e) {
    if (/VBOX_E_OBJECT_NOT_FOUND/.test(e)) {
      throw 'No box with name \'' + name + '\' was found.';
    }

    throw e;
  }

  var matches = trim(output).match(/^Value: ([0-9\.]+)$/);

  if (matches === null) {
    throw 'Unable to get the IP.';
  }

  return matches[1];
}

function main(args) {
  try {
    var params = parseArgs(args);
    var config = parseConfig('sshbox.txt');
    var ip = getBoxIp(config.VBoxManage, params.name, params.num);

    var proxy = parseProxy(params.proxy, merge([config, {
      $u: params.user,
      $n: params.name,
      $i: ip
    }]));

    start(proxy[0], proxy.slice(1));
  } catch (e) {
    MessageBox.Show(e);
    return 1;
  }
}

System.Environment.Exit(main(System.Environment.GetCommandLineArgs()));