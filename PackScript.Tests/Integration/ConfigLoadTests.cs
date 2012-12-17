﻿using FluentAssertions;
using NSubstitute;
using NUnit.Framework;
using PackScript.Api.Files;
using PackScript.Tests.TestInfrastructure;

namespace PackScript.Tests.Integration
{
    [TestFixture]
    public class ConfigLoadTests
    {
        [Test]
        public void ScansForConfig_passes_correct_arguments_to_getFilesnames()
        {
            var api = Substitute.For<IFilesApi>();
            api.Name.Returns("Files");
            ContextFactory.Create(@"..\..\Integration\ConfigLoad", api, new TestApi()).ScanForResources();
            api.Received().getFilenames(@"..\..\Integration\ConfigLoad\*pack.js", true);
        }

        [Test]
        public void Config_files_are_loaded_recursively_and_evaluated()
        {
            var test = new TestApi();
            ContextFactory.Create(@"..\..\Integration\ConfigLoad", test).ScanForResources();
            test.Values.Should().Contain("root folder loaded");
            test.Values.Should().Contain("subfolder loaded");
        }

        [Test]
        public void Named_config_files_are_loaded_and_evaluated()
        {
            var test = new TestApi();
            ContextFactory.Create(@"..\..\Integration\ConfigLoad", test).ScanForResources();
            test.Values.Should().Contain("named config loaded");
        }
    }
}
